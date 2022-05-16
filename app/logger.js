'use strict';

const logger = req => {
  const date = new Date().toISOString();
  console.log([date, req.method, req.url].join('  '));
};

module.exports = { logger };
