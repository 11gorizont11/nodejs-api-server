import boom from 'boom';
import logger from '../config/logger'
const mongoose = require('mongoose');
const ArtistModel = mongoose.model('Artist');

const ArtistService = {
  getAll : (req, res, next) => ArtistModel.find()
                                          .then(artists=>{
                                              res.send(artists)
                                            }
                                          )
                                          .catch(err=> {
                                            logger.error(err);
                                            res.send(boom.badData(err.message));
                                          }),
  getById : (req, res, next) => ArtistModel.findOne({_id: req.params.id})
                                        .then(artist => {
                                          if (!artist) {
                                            throw new Error(`Can not find artist with id ${artist.id}`);
                                          }
                                          return artist.populate('tracks')
                                                       .execPopulate()
                                                       .then(artist => {
                                                         res.send(artist);
                                                       })


                                      })
                                      .catch(err => {
                                        res.send(boom.badData(err.message));
                                        next(err);
                                        }),
  addOne: (req, res, next) => ArtistModel.insertMany({name: req.body.name})
                                          .then(artist =>{
                                            if(!artist){
                                              throw new Error('Could not save artist')
                                            }
                                            res.sendStatus(200);
                                          })
                                          .catch(err=>{
                                            res.send(boom.badData(err.message));
                                            next(err);
                                          }),
  updateOne: (req, res, next) => ArtistModel.findByIdAndUpdate(req.params.id, {name: req.body.name,
                                                                              tracks : req.body.tracks})
                                            .then(artist => {
                                              if(!artist){
                                                throw new Error('Could not update artist')
                                              }
                                              res.sendStatus(200);
                                            })
                                            .catch(err => {
                                              res.send(boom.badRequest(err.message));
                                              next(err);
                                            }),
  deleteOne: (req, res, next) => ArtistModel.findByIdAndRemove(req.params.id)
                                .then(() => {
                                  res.sendStatus(200);
                                })
                                .catch(err => {
                                  res.send(boom.expectationFailed(err.message));
                                  next(err);
                                })
};

export default ArtistService;