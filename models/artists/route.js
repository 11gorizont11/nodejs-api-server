'use strict';
const express = require('express'),
  router = express.Router(),
  boom = require('boom'),
  ArtistService = require('./service'),
  log4js = require('log4js'),
  logger = log4js.getLogger('db');


router.get('/artists', (req, res, next) => {
  ArtistService.getAll()
             .then(()=> res)
             .catch(err=> {
               logger.error(err);
               res.boom.badData(err.message);
             });
});


module.exports = router;