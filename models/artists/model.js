const mongoose = require('mongoose'),
  ObjectId = mongoose.Schema.Types.ObjectId;

let artistSchema = new mongoose.Schema({
  id: ObjectId,
  name: String
});

module.exports = mongoose.model('Artist', artistSchema);