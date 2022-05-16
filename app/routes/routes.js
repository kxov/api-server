'use strict';

const routing = {
  person: require('./person.js'),
  '/': require('./root.js'),
};

module.exports = { routing };
