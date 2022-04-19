'use strict';

const http = require('http');

const { logger } = require("./app/logger");
const { context } = require('./app/context');
const { parseCookies } = require('metautil');

let cache = Object.create(null);
const server = (routing, port) => {
  const serveFromCache = (req, res) => {
    logger(req);
    if (cache[req.url] && req.method === 'GET') {
      res.writeHead(200);
      res.end(cache[req.url]);
      return true;
    }
    return false;
  }

  http.createServer(async (req, res) => {

    const cookies = parseCookies(req.headers.cookie);
    const { method, url } = req;
    const name = '/' === url ? url : url.substring(1).split('/');
    const entity = routing[name];

    if (!serveFromCache(req, res)) {
      const handler = entity[method.toLowerCase()];
      const requestContext = context(req, res, cookies, cache);

      const { code, message } = await handler(requestContext);

      res.statusCode = code;
      res.end(message);
    }

  }).listen(port);
}

setInterval(() => {
  cache = {};
  console.log('cache cleared');
}, 10000)

module.exports = { server };
