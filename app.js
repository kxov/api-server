'use strict';

const { routing } = require('./app/routes/routes.js');
const { server } = require('./server.js');

server(routing, 9799);
