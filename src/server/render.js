'use strict';

// TODO: switch back to jsdom for hyperapp SSR for the time being...
//import { renderToString } from 'react-dom/server';
//import App from '../App';
//import Stores from '../stores';
import { JSDOM } from 'jsdom';
import app from '../app';
import { DEV } from '../utils';
import pjson from '../../package.json';

const render = async(ctx, next) => {
	const path = ctx.request.path;
	const data = {
		path
	};

	if (ctx.method !== 'GET' ||
			path.startsWith('/__webpack_hmr') ||
			/\.js$/.test(path) ||
			/\.json$/.test(path)
	) {
		await next();
	} else {
		const baseDoc = `
			<!DOCTYPE html>
			<html lang=en>
				<head>
					<meta charset="utf-8">
    			<meta http-equiv="X-UA-Compatible" content="IE=edge">
   				<meta name="viewport" content="width=device-width, initial-scale=1">
					<title>${pjson.name}</title>
					<script src='/vendor.js' defer></script>
					<script src='/main.js' defer></script>
				</head>
				<body>
				</body>
			</html>
		`;
		
		const dom = new JSDOM(baseDoc);
		const window = dom.window;
		const document = window.document;
		global.window = window;
		global.document = document;
		global.location = {
			pathname: path
		}; 
		
		app();		
		
		ctx.body = dom.serialize();
		ctx.type = 'text/html';
	}
};

export default render;
