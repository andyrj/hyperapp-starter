'use strict';

import Koa from 'koa';
import serve from 'koa-static-server';
import http from 'http';
import app from './app';

require('undom/register');

function serialize(el) {
	if (el.nodeType===3) return el.textContent;
	var name = String(el.nodeName).toLowerCase(),
		str = '<'+name,
		c, i;
	for (i=0; i<el.attributes.length; i++) {
		str += ' '+el.attributes[i].name+'="'+el.attributes[i].value+'"';
	}
	str += '>';
	for (i=0; i<el.childNodes.length; i++) {
		c = serialize(el.childNodes[i]);
		if (c) str += '\n\t'+c.replace(/\n/g,'\n\t');
	}
	return str + (c?'\n':'') + '</'+name+'>';
}

function enc(s) {
	return s.replace(/[&'"<>]/g, function(a){ return `&#${a};` });
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

    /* may still need these for router mixin	
		global.location = {
			pathname: path
		}; 
    */
		// just stubbing out functions not needed for SSR with hyperapp-router
		global.addEventListener = (str, fn) => {};
    document.readyState = ["1"];
		app(state);
		
    const html = `
			<!DOCTYPE html>
			<html lang=en>
				<head>
					<meta charset="utf-8">
					<meta http-equiv="X-UA-Compatible" content="IE=edge">
					<meta name="viewport" content="width=device-width, initial-scale=1">
					<title>ssr</title>
					<script src='/js/vendor.js' defer></script>
					<script src='/js/main.js' defer></script>
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
		ctx.type = 'text/html';
	}
});

const port = 3000;

const server = http.createServer(k.callback()).listen(port);

console.log(`Server running on: http://localhost: ${port}`);
