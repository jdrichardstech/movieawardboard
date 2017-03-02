var SupportingActor = require('../models/SupportingActor')

module.exports = {

  find: function(params, cb){
    SupportingActor.find(params, function(err, supportingactors){
      if(err){
        cb(err, null)
        return
      }
      cb(null, supportingactors)
      return
    })
  },

  findById: function(id,cb){
    SupportingActor.findById(id, function(err, supportingactor){
      if(err){
        cb(err, null)
        return
      }
      cb(null, supportingactor)
      return
    })
  },

  create: function(params, cb){
    SupportingActor.create(params, function(err, supportingactor){
      if(err){
        cb(err, null)
        return
      }
      cb(null, supportingactor)
      return
    })
  },

  update: function(id, params, cb){
    SupportingActor.findByIdAndUpdate(id,params, function(err, supportingactor){
      if(err){
        cb(err, null)
        return
      }
      cb(null, supportingactor)
      return
    })
  },

  delete: function(id, cb){
    SupportingActor.findByIdAndRemove(id, function(err){
      if(err){
        cb(err, null)
        return
      }
      cb(null, null)
      return
    })
  }
}
