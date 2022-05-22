'use strict';

class Client {
  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.ip = req.connection.remoteAddress;
    this.cookie = {};
    this.preparedCookie = [];
    this.parseCookie();
  }

  static async getInstance(req, res) {
    return new Client(req, res);
  }

  parseCookie() {
    const { req } = this;
    const { cookie } = req.headers;
    if (!cookie) return;
    const items = cookie.split(';');
    for (const item of items) {
      const parts = item.split('=');
      const key = parts[0].trim();
      const val = parts[1] || '';
      this.cookie[key] = val.trim();
    }
  }

  setCookie(name, val) {
    const cookie = `${name}=${val};`;
    this.preparedCookie.push(cookie);
  }

  sendCookie() {
    const { res, preparedCookie } = this;
    if (preparedCookie.length && !res.headersSent) {
      console.dir({ preparedCookie });
      res.setHeader('Set-Cookie', preparedCookie);
    }
  }

  async receiveArgs() {
    const buffers = [];
    for await (const chunk of this.req) {
      buffers.push(chunk);
    }
    const data = Buffer.concat(buffers).toString();
    return JSON.parse(data);
  }
}

module.exports = Client;
