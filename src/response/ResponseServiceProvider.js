const cookies = require('./cookies').cookies;
const response = require('./response');

module.exports = response({ cookies });
