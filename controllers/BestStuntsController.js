var BestStunts = require('../models/BestStunts')



module.exports = {

  find: function(params, cb){
    BestStunts.find(params, function(err, bestStunts){
      if(err){
        cb(err, null)
        return
      }
      cb(null, bestStunts)
      return
    })
  },

  findById: function(id,cb){
    BestStunts.findById(id, function(err, bestStunt){
      if(err){
        cb(err, null)
        return
      }
      cb(null, bestStunt)
      return
    })
  },

  create: function(params, cb){
    BestStunts.create(params, function(err, bestStunt){
      if(err){
        cb(err, null)
        return
      }
      cb(null, bestStunt)
      return
    })
  },

  update: function(id, params, cb){
    BestStunts.findByIdAndUpdate(id,params, function(err, bestStunt){
      if(err){
        cb(err, null)
        return
      }
      cb(null, bestStunt)
      return
    })
  },

  delete: function(id, cb){
    BestStunts.findByIdAndRemove(id, function(err){
      if(err){
        cb(err, null)
        return
      }
      cb(null, null)
      return
    })
  }

}
