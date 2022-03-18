'use strict';

const { response } = require('../response');
const { Person } = require('../domain/person');
const fs = require('fs');

const receiveArgs = async (req) => {
  const buffers = [];
  for await (const chunk of req) buffers.push(chunk);
  const data = Buffer.concat(buffers).toString();
  return JSON.parse(data);
};

module.exports = {
  async get(requestContext) {
    try {
      const buffer = await fs.promises.readFile('./person.json');
      const obj = JSON.parse(buffer.toString());

      const result = JSON.stringify(Person.from(obj));

      requestContext.cache[requestContext.req.url] = result;

      return response(result);
    } catch (e) {
      return response(e.toString(), 500);
    }
  },
  async post(requestContext) {
    const obj = await receiveArgs(requestContext.req);

    if (obj.name) obj.name = obj.name.trim();
    const data = JSON.stringify(obj);

    try {
      await fs.promises.writeFile('./person.json', data);
      return response('File saved');
    } catch (e) {
      return response(e.toString(), 500)
    }
  }
};
