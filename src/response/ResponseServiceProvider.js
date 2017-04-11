const { cookies } = require('./cookies');
const response = require('./response');

module.exports = response({ cookies });
