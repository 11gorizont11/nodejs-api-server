import mongoose from 'mongoose'
const ObjectId = mongoose.Schema.Types.ObjectId;

let Artist = new mongoose.Schema({
  id: ObjectId,
  name: String.require,
  tracks: [{type: ObjectId, ref: 'Track'}]
});

const ArtistModel = mongoose.model('Artist', Artist);
export default ArtistModel;