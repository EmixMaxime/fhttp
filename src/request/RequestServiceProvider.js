const { getHeader, getParam, getCookie } = require('./utils');
const buildShortcuts = require('../buildShortcuts');

const request = require('./request');

module.exports = request({ getHeader, getParam, getCookie, buildShortcuts });
