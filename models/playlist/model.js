import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;


const PlayList = new mongoose.Schema({
  id:ObjectId,
  name: String,
  tracks: [{type: ObjectId, ref: 'Track'}]
});

const PlayListModel = mongoose.model('PlayList', PlayList);

export default PlayListModel