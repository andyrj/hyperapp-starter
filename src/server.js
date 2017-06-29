'use strict';

import Koa from 'koa';
import serve from 'koa-static-server';
import http from 'http';
import simpleDom from 'simple-dom';
import app from './app';

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
		const document = new simpleDom.Document();
		global.document = document;
		/* may still need for router mixin
    global.location = {
			pathname: path
		}; 
		// just stubbing out functions not needed for SSR with hyperapp-router
		global.addEventListener = (str, fn) => {};
    */
		app({ count: 0 });
    const html = `
			<!DOCTYPE html>
			<html lang=en>
				<head>
					<meta charset="utf-8">
					<meta http-equiv="X-UA-Compatible" content="IE=edge">
					<meta name="viewport" content="width=device-width, initial-scale=1">
					<title>ssr-simple-dom</title>
					<script src='/js/vendor.js' defer></script>
					<script src='/js/main.js' defer></script>
					<script id="state" type="application/json">
						${JSON.stringify({ count: 0 })}
					</script>
				</head>
				<body>
          ${document.body.innerHTML}
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
