'use strict';

import boom from 'boom';
import express from 'express';
import bodyParser from 'body-parser';
import log from './config/logger';
import mongoose from './models/index';
import api from './api';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', (req, res) => {
  res.send('Hello API')
});

app.use('/api', api);


app.listen(3030, function() {
  log.info("API Server Started!")
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
    log.error("Something went wrong:", err);
    res.send(boom.badData(err.message));
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  log.error("Something went wrong:", err);
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

