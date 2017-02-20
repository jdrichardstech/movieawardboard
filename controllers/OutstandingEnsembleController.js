var OutstandingEnsemble = require('../models/OutstandingEnsemble')



module.exports = {

  find: function(params, cb){
    OutstandingEnsemble.find(params, function(err, outstandingensembles){
      if(err){
        cb(err, null)
        return
      }
      cb(null, outstandingensembles)
      return
    })
  },

  findById: function(id,cb){
    OutstandingEnsemble.findById(id, function(err, outstandingensemble){
      if(err){
        cb(err, null)
        return
      }
      cb(null, outstandingensemble)
      return
    })
  },

  create: function(params, cb){
    OutstandingEnsemble.create(params, function(err, outstandingensemble){
      if(err){
        cb(err, null)
        return
      }
      cb(null, outstandingensemble)
      return
    })
  },

  update: function(id, params, cb){
    OutstandingEnsemble.findByIdAndUpdate(id,params, function(err, outstandingensemble){
      if(err){
        cb(err, null)
        return
      }
      cb(null, outstandingensemble)
      return
    })
  },

  delete: function(id, cb){
    OutstandingEnsemble.findByIdAndRemove(id, function(err){
      if(err){
        cb(err, null)
        return
      }
      cb(null, null)
      return
    })
  }

}
