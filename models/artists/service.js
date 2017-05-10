'use strict';

const mongoose = require('mongoose'),
      ArtistModel = mongoose.model('Artist');

const ArtistService = {
  getAll: () => {
    return ArtistModel.find();
  },

};

module.exports = ArtistService;