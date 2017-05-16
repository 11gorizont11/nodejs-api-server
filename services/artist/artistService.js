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
                                          }),
  getById : (req, res, next) => ArtistModel.find({_id: req.params.id})
    .then(artist => {
      if (!artist) {
        throw new Error(
          `Can not find artist with id ${req.params.id}`
        );
      }
        res.send(artist)
    })
    .catch(err => {
      res.send(boom.badData(err.message));
      next(err);
      })
};



export default ArtistService;