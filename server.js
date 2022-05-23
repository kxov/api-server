'use strict';

const http = require('http');

const { logger } = require('./app/logger');
const cache = require('./app/cache');
const Client = require('./app/client');

const cacheInterval = 10000;

const server = (routing, port) => {
  const serveFromCache = (req, res) => {
    logger(req);
    const cacheUrl = cache.get(req.url);
    if (cacheUrl && req.method === 'GET') {
      res.writeHead(200);
      res.end(cacheUrl);
      return true;
    }
    return false;
  };

  http
    .createServer(async (req, res) => {
      const client = Client.getInstance(req, res);

      const { method, url } = req;
      const name = '/' === url ? url : url.substring(1).split('/');
      const entity = routing[name];

      if (!serveFromCache(req, res)) {
        const handler = entity[method.toLowerCase()];

        const { code, message } = await handler(client);

        if (client.req.method === 'GET') {
            cache.set(client.req.url, message);
        }

        client.sendCookie();
        res.statusCode = code;
        res.end(message);
      }
    })
    .listen(port);
};

setInterval(() => {
  cache.clear();
  console.log('cache cleared');
}, cacheInterval);

module.exports = { server };
