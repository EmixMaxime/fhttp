const deps = require('./utils');
const buildShortcuts = require('../buildShortcuts');
deps.buildShortcuts = buildShortcuts;

const request = require('./request');

module.exports = request(deps);
