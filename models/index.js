import mongoose from 'mongoose';
import log from '../config/logger';
import bluebird from 'bluebird';
import finder from 'fs-finder'
import ArtistModel from './artists/model';
import TrackModel from './track/model';

mongoose.Promise = bluebird;

mongoose.connect('mongodb://localhost/myapi');


// finder.from(__dirname).findFiles("model.js").forEach((file)=> {
//   require(file);
// });


const db = mongoose.connection;

db.on('error', (err) => {
  console.error('connection error:', err.message);
});
db.once('open', function callback () {
  log.info("Connected to DB!");
});

export default mongoose;