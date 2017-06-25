const api = async(ctx, next) => {
	const path = ctx.path;
	const method = ctx.method;
	if (method === 'GET' && path === '/api/ping') {
		ctx.body = 'pong';
		ctx.type = 'application/json';
	}
	await next();
};

export default api;
