"use strict";

import { setup, serialize } from 'hyperapp-server';
import app from "../app";
import { DEV } from "../utils";
import state from "../state";
import pjson from "../../package.json";

const render = async (ctx, next) => {
  const path = ctx.request.path;
  const data = {
    path
  };

  if (
    ctx.method !== "GET" ||
    path.startsWith("/__webpack_hmr") ||
    /\.js$/.test(path) ||
    /\.json$/.test(path) ||
    /\.ico$/.test(path)
  ) {
    await next();
  } else {
    setup();
    global.location = {
      pathname: path
    };
    // just stubbing out functions not needed for SSR with hyperapp-router
    global.addEventListener = (str, fn) => {};
    /*
    let renderDiv = document.createElement('div');
    renderDiv.setAttribute('id', 'root');
    renderDiv.setAttribute('data-ssr', true); // not sure if this is ok with only 1 arg...
    document.body.appendChild(renderDiv);
    */
    app(state);

    const html = `
			<!DOCTYPE html>
			<html lang=en>
				<head>
					<meta charset="utf-8">
    			<meta http-equiv="X-UA-Compatible" content="IE=edge">
   				<meta name="viewport" content="width=device-width, initial-scale=1">
					<title>${pjson.name}</title>
					<script src='/vendor.js' defer></script>
					<script src='/main.js' defer></script>
					<script id="state" type="application/json">
						${JSON.stringify(state)}
					</script>
				</head>
				<body>
          ${serialize(document.body.children[0])}
				</body>
			</html>
		`;

    ctx.body = html;
    ctx.type = "text/html";
  }
};

export default render;
