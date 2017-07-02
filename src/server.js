'use strict';

import Koa from 'koa';
import serve from 'koa-static-server';
import http from 'http';
import app from './app';

require('undom/register');

function serialize(el) { // eslint-disable-line complexity
  if (el.nodeType===3) return el.textContent;
  var name = String(el.nodeName).toLowerCase(),
    str = '<'+name,
    c, i;
  for (i=0; i<el.attributes.length; i++) {
    str += ' '+el.attributes[i].name+'="'+el.attributes[i].value+'"';
  }
  switch (name) { // eslint-disable-line smells/no-switch
    case "area":
    case "base":
    case "br":
    case "col":
    case "command":
    case "hr":
    case "img":
    case "keygen":
    case "link":
    case "meta":
    case "param":
    case "source":
    case "track":
    case "wbr":
      return str + " />";
    default:
      str += ">";
      break;
  }
  for (i=0; i<el.childNodes.length; i++) {
    c = serialize(el.childNodes[i]);
    if (c) str += c;
  }
  return str + '</'+name+'>';
}

function enc(s) {
  return s.replace(/[&'"<>]/g, function(a){ return `&#${a};` });
}

function getHTML(state, body) {
  return `<!DOCTYPE html>
    <html lang=en>
      <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>ssr</title>
        <script src='/js/vendor.js' defer></script>
        <script src='/js/main.js' defer></script>
        <script id="state" type="application/json">
          ${JSON.stringify(state)}
        </script>
      </head>
      <body>${body}</body>
    </html>
  `;
}

const k = new Koa();

k.use(serve({rootDir: '.build/', rootPath: '/js'}));

k.use(async (ctx, next) => {
  ctx.res.statusCode = 200;
  await next();
});

k.use(async(ctx, next) => {
  const path = ctx.request.path;

  if (path === '/js/vendor.js' || path === '/js/app.js')
  {
    await next();
  } else {
    const state = { count: 0 };

    //console.log(document.readyState);

    // may still need these for router mixin	
    global.location = {
      pathname: path
    }; 
    // just stubbing out functions not needed for SSR with hyperapp-router
    global.addEventListener = (str, fn) => {};
    document.readyState = ["1"];
    app(state);
    
    const body = serialize(document.body.children[0]);
    console.log(body);
    ctx.body = getHTML(state, body);
    ctx.type = 'text/html';
  }
});

const port = 3000;

const server = http.createServer(k.callback()).listen(port);

console.log(`Server running on: http://localhost: ${port}`);
