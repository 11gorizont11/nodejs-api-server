import boom from 'boom';
import log from '../config/logger'
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
                                            log.error('Can not find any tracks');
                                            res.send(boom.badData(err.message));
                                          }),

  getById : (req, res, next) => TrackModel.find({_id: req.params.id})
                                           .then(track => {
                                             if (!track) {
                                               throw new Error(`Can not find track with Id - ${req.params.id}`);
                                             }
                                             res.send(track)
                                           })
                                           .catch(err => {
                                             res.send(boom.badData(err.message));
                                             next(err);
                                           }),

  addOne: (req, res, next) => TrackModel.insertMany({
                                                      name: req.body.name,
                                                      artist_id: req.body.artist_id
                                                    })
                                                    .then(track => {
                                                      log.info('Track was saved successfully!');
                                                      return ArtistModel.findOne({_id:track.artist_id})
                                                                        .populate({path:'tracks', model: 'Track'})
                                                                        .execPopulate().then(artist=>{
                                                                        console.log(artist);
                                                        }).catch(err=>res.send(boom.badData(err.message)))
                                                    })
                                                    .catch(err=>res.send(boom.badData(err.message))),

  updateOne: (req, res, next) => TrackModel.findByIdAndUpdate(req.params.id, {name: req.body.name})
                                                      .then(track => {
                                                        if(!track){
                                                          throw new Error('Could not update track')
                                                        }
                                                        res.sendStatus(200);
                                                      })
                                                      .catch(err => {
                                                        res.send(boom.badRequest(err.message));
                                                        next(err);
                                                      }),
  deleteOne: (req, res, next) => TrackModel.findByIdAndRemove(req.params.id)
                                  .then(track => {
                                    if(!track){
                                      throw new Error(`Could not find track with ID ${req.params.id}`)
                                    }
                                    res.sendStatus(200);
                                  })
                                  .catch(err =>{
                                    res.send(boom.badRequest(err.message));
                                    next(err);
                                  })

};

export default TrackService;