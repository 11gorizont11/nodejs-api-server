import boom from 'boom';
import log from '../config/logger';

const mongoose = require('mongoose');
const PlayListModel = mongoose.model('PlayList');



const PlayListService = {
  getAll : (req, res, next) => PlayListModel.find()
                                          .then(playLists=>{
                                              res.send(playLists)
                                            }
                                          )
                                          .catch(err=> {
                                            log.error(err);
                                            res.send(boom.badData(err.message));
                                          }),
  getById : (req, res, next) => PlayListModel.findOne({_id: req.params.id})
                                           .then(playList => {
                                             if (!playList) {
                                               throw new Error(`Can not find playList with id ${playList.id}`);
                                             }
                                             return playList.populate('tracks')
                                                          .execPopulate()
                                                          .then(playList => {
                                                            res.send(playList);
                                                          })
                                           })
                                           .catch(err => {
                                             res.send(boom.badData(err.message));
                                             next(err);
                                           }),
  addOne: (req, res, next) => PlayListModel.create({name: req.body.name,
                                                    tracks : req.body.tracks})
                                         .then(playList =>{
                                           if(!playList){
                                             throw new Error('Could not save playList')
                                           }
                                           return playList.populate('tracks')
                                                        .execPopulate()
                                                        .then(playList => {
                                                          res.send(playList);
                                                        })
                                         })
                                         .catch(err=>{
                                           res.send(boom.badData(err.message));
                                           next(err);
                                         }),
  updateOne: (req, res, next) => PlayListModel.findByIdAndUpdate(req.params.id, {name: req.body.name,
                                                                                tracks : req.body.tracks})
                                            .then(playList => {
                                              if(!playList){
                                                throw new Error('Could not update playList')
                                              }
                                              return playList.populate('tracks')
                                                             .execPopulate()
                                                             .then(playList => {
                                                               res.send(playList);
                                                             })
                                            })
                                            .catch(err => {
                                              res.send(boom.badRequest(err.message));
                                              next(err);
                                            }),
  deleteOne: (req, res, next) => PlayListModel.findByIdAndRemove(req.params.id)
                                            .then(() => {
                                              res.sendStatus(200);
                                            })
                                            .catch(err => {
                                              res.send(boom.expectationFailed(err.message));
                                              next(err);
                                            })
};


export default PlayListService;
