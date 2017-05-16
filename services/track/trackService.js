import boom from 'boom';
import logger from '../../config/logger'
const mongoose = require('mongoose');
const ArtistModel = mongoose.model('Artist');
const TrackModel = mongoose.model('Track');

const TrackService = {
  getAll : (req, res, next) => TrackModel.find()
                                          .then(tracks =>{
                                              res.send(tracks)
                                            }
                                          )
                                          .catch(err=> {
                                            logger.error('Can not find any tracks');
                                            res.send(boom.badData(err.message));
                                          }),
  getById : (req, res, next) => TrackModel.find({_id: req.params.id})
                                           .then(track => {
                                             if (!track) {
                                               throw new Error(`Can not find track with id ${req.params.id}`);
                                             }
                                             res.send(track)
                                           })
                                           .catch(err => {
                                             res.send(boom.badData(err.message));
                                             next(err);
                                           }),
  addOne: (req, res, next) => TrackModel.insertMany({
                                                      name: req.body.name,
                                                      artist_id: req.body.id
                                                    })
                                                    .then(track =>

                                                      res.sendStatus(200))
                                                    .catch(err=>res.send(boom.badData(err.message)))
};

export default TrackService;