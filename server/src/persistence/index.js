// require mysql module if MYSQL_HOST is defined in the environment
if (process.env.MYSQL_HOST) module.exports = require('./mysql');
// otherwise import sqlite
// else module.exports = require('./sqlite');
