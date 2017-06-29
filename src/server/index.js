"use strict";

import Koa from "koa";
import bodyParser from "koa-bodyparser";
import helmet from "koa-helmet";
import webpack from "webpack";
import http from "http";
import convert from "koa-convert";

import api from "./api";
import render from "./render";
import { DEV } from "../utils";
import clientConfig from "../../webpack.client";

const app = new Koa();

app.use(helmet());
app.use(bodyParser());

app.use(async (ctx, next) => {
  ctx.res.statusCode = 200;
  await next();
});

if (DEV) {
  const compile = webpack(clientConfig);
  app.use(
    convert(
      require("koa-webpack-dev-middleware")(compile, {
        // eslint-disable-line
        publicPath: clientConfig.output.publicPath,
        noInfo: false,
        overlay: false,
        reload: true,
        quiet: false,
        hot: true,
        stats: {
          colors: true
        }
      })
    )
  );
  app.use(
    convert(
      require("koa-webpack-hot-middleware")(compile, {
        // eslint-disable-line
        log: console.log,
        path: "/__webpack_hmr",
        heartbeat: 10 * 1000
      })
    )
  );
}

app.use(async (ctx, next) => {
  if (ctx.path.startsWith("/api")) {
    await api(ctx, next);
  } else {
    await render(ctx, next);
  }
});

const port = 3000;

const server = http.createServer(app.callback()).listen(port);

if (module.hot) {
  module.hot.accept("./render", () => {});
  module.hot.accept("./api", () => {});
}

console.log(`Server running on: http://localhost: ${port}`);
