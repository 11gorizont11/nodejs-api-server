'use strict';

import boom from 'boom';
import express from 'express';
import bodyParser from 'body-parser';
import log4js from 'log4js';
import api from './api';

// import router from './api/router';
import blueird from 'bluebird';
import mongoose from 'mongoose';


const logger = log4js.getLogger('app');
const app = express();
mongoose.Promise = blueird;
mongoose.connect('mongodb://localhost/myapi');
require('./models/artists/model');

const db = mongoose.connection;

db.on('error', (err)=> {
  logger.error('Mongodb is down!', err);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', (req, res) => {
  res.send('Hello API')
});

app.use('/api', app.router);
// app.use(router);

db.on('open', ()=>{
  logger.info("Connected to db!");
  app.listen(3030, function() {
    logger.info("API Server Started!")
  });
});


/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    logger.error("Something went wrong:", err);
    res.send(boom.badData(err.message));
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  logger.error("Something went wrong:", err);
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
