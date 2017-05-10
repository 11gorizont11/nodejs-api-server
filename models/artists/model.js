const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Artist = new mongoose.Schema({
  id: ObjectId,
  name: String
});

const ArtistModel = mongoose.model('Artist', Artist);
module.exports = ArtistModel;
