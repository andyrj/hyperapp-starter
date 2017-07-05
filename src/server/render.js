"use strict";

import app from "../app";
import { DEV } from "../utils";
import state from "../state";
import pjson from "../../package.json";

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
    if (c) str += '\n\t'+c.replace(/\n/g,'\n\t');
  }
  return str + (c?'\n':'') + '</'+name+'>';
}

function enc(s) {
  return s.replace(/[&'"<>]/g, function(a){ return `&#${a};`; });
}

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
    require('undom/register');
    global.location = {
      pathname: path
    };
    // just stubbing out functions not needed for SSR with hyperapp-router
    global.addEventListener = (str, fn) => {};
    document.isServer = true;
    document.readyState = ["1"];

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
