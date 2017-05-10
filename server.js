'use strict';

const express = require('express');
const bodyParser = require('body-parser') ;
const log4js = require('log4js');
const db = require('./models/models');
const ArtistsRoute = require('./models/artists/route');

const app = express();

const logger = log4js.getLogger('app');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', function(req, res) {
  res.send('Hello API')
});

app.use('/artists', ArtistsRoute);

app.listen(3030, function() {
  logger.info("API Server Started!")
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
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
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
