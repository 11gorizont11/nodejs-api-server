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
  getById : (req, res, next) => PlayListModel.find({_id: req.params.id})
                                           .then(playList => {
                                             if (!playList) {
                                               throw new Error(`Can not find playList with id ${playList.id}`);
                                             }
                                             res.send(playList)
                                           })
                                           .catch(err => {
                                             res.send(boom.badData(err.message));
                                             next(err);
                                           }),
  addOne: (req, res, next) => PlayListModel.insertMany({name: req.body.name,
                                                        track_ids : req.body.track_ids})
                                         .then(playList =>{
                                           if(!playList){
                                             throw new Error('Could not save playList')
                                           }
                                           res.sendStatus(200);
                                         })
                                         .catch(err=>{
                                           res.send(boom.badData(err.message));
                                           next(err);
                                         }),
  updateOne: (req, res, next) => PlayListModel.findByIdAndUpdate(req.params.id, {name: req.body.name})
                                            .then(playList => {
                                              if(!playList){
                                                throw new Error('Could not update playList')
                                              }
                                              res.sendStatus(200);
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
