import boom from 'boom';
import logger from '../../config/logger'
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
                                          })
};



export default ArtistService;