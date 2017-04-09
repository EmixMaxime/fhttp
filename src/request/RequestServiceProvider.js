const headers = require('./headers').headers;
const cookies = require('./cookies').cookies;
const request = require('./request');

module.exports = request({ headers, cookies });
