'use strict';

const mongoose = require('mongoose');
const log4js = require('log4js');
const logger = log4js.getLogger('db');
const finder = require('fs-finder');

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/myapi');

finder.from(__dirname).findFiles("model.js").forEach((file)=> {
  require(file);
});

const db = mongoose.connection;

db.on('error', function(err) {
  logger.error('Connection Error!', err);
});
db.once('open', function() {
  logger.info('Connected to db!');
});

module.exports = mongoose;

