const print = require('../utils/print');
const embed = require('../utils/embed');
const commands = require('../utils/commands');
const manage = require('../utils/manage');
const channels = require('../utils/channels');
const status = require('../utils/status');
const perms = require('../utils/perms');
const config = require('../config.json');

// module.exports = print;
// module.exports = embed;

exports.print = print
exports.embed = embed;
exports.commands = commands;
exports.manage = manage;
exports.channels = channels;
exports.status = status;
exports.config = config;
exports.perms = perms;