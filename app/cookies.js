'use strict';

const parseCookies = (cookie) => {
  const cookies = {};

  const items = cookie.split(';');
  for (const item of items) {
    const parts = item.split('=');
    const key = parts[0].trim();
    const val = parts[1] || '';
    cookies[key] = val.trim();
  }
  return cookies;
};

module.exports = { parseCookies };



