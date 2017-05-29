import mongoose from 'mongoose';
import log from '../config/logger';
import bluebird from 'bluebird';
import ArtistModel from "./artist/model";
import TrackModel from "./track/model";
import PlayListModel from "./playlist/model";

mongoose.Promise = bluebird;
// assert.equal(query.exec().constructor, bluebird);

mongoose.connect('mongodb://localhost/myapi');


const db = mongoose.connection;

db.on('error', (err) => {
  console.error('connection error:', err.message);
});
db.once('open', function callback () {
  log.info("Connected to DB!");
});

export default mongoose;