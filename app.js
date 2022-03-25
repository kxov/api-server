'use strict';

const { server } = require('./server.js');
const { routing } = require('./app/routes/routes.js');

server(routing, 9799);
