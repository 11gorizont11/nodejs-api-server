import mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;

let Track = new mongoose.Schema({
  id: ObjectId,
  name: String,
  artist_id: { type: ObjectId, ref: 'Artist' }
});

const TrackModel = mongoose.model('Track', Track);

export default TrackModel;