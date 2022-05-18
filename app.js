'use strict';

const port = 9999;

const { server } = require('./server.js');
const { routing } = require('./app/routes/routes.js');

server(routing, port);
