'use strict';

const { response } = require('../response');

module.exports = {
  get(requestContext) {
    requestContext.res.setHeader('Set-Cookie', ['mycookie=test']);
    requestContext.res.setHeader('Content-Type', 'text/html');

    const ip = requestContext.req.connection.remoteAddress;
    requestContext.res.write(`<h1>Welcome</h1>Your IP: ${ip}`);

    return response(`<pre>${JSON.stringify(requestContext.cookies)}</pre>`);
  },
};
