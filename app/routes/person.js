'use strict';

const { response } = require('../response');
const { Person } = require('../domain/person');
const cache = require('../cache');
const fs = require('fs');

module.exports = {
  async get(client) {
    try {
      const buffer = await fs.promises.readFile('./person.json');
      const obj = JSON.parse(buffer.toString());

      const result = JSON.stringify(Person.from(obj));

      return response(result);
    } catch (e) {
      return response(e.toString(), 500);
    }
  },
  async post(client) {
    const obj = await client.receiveArgs();

    if (obj.name) obj.name = obj.name.trim();
    const data = JSON.stringify(obj);

    try {
      await fs.promises.writeFile('./person.json', data);
      return response('File saved');
    } catch (e) {
      return response(e.toString(), 500);
    }
  },
};
