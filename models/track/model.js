import mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;

let Track = new mongoose.Schema({
  id: ObjectId,
  name: String.require,
  artist: {type: ObjectId, ref: "Artist"},
});

const TrackModel = mongoose.model('Track', Track);
export default TrackModel;