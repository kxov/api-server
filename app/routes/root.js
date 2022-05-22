'use strict';

const { response } = require('../response');

module.exports = {
  get(client) {
    client.setCookie('mycookie', 'test');
    client.res.setHeader('Content-Type', 'text/html');

    const ip = client.ip;

    let result = `<h1>Welcome</h1>Your IP: ${ip}`;

    result += `<pre>${JSON.stringify(client.cookie)}</pre>`;

    return response(result);
  },
};
