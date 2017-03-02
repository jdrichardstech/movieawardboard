var Movie = require('../models/Movie')



module.exports = {

  find: function(params, cb){
    Movie.find(params, function(err, movies){
      if(err){
        cb(err, null)
        return
      }
      cb(null, movies)
      return
    })
  },

  findById: function(id,cb){
    Movie.findById(id, function(err, movie){
      if(err){
        cb(err, null)
        return
      }
      cb(null, movie)
      return
    })
  },

  create: function(params, cb){
    Movie.create(params, function(err, movie){
      if(err){
        cb(err, null)
        return
      }
      cb(null, movie)
      return
    })
  },

  update: function(id, params, cb){
    Movie.findByIdAndUpdate(id,params, function(err, movie){
      if(err){
        cb(err, null)
        return
      }
      cb(null, movie)
      return
    })
  },

  delete: function(id, cb){
    Movie.findByIdAndRemove(id, function(err){
      if(err){
        cb(err, null)
        return
      }
      cb(null, null)
      return
    })
  }
}
