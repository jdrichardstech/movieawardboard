var LeadActor = require('../models/LeadActor')



module.exports = {

  find: function(params, cb){
    LeadActor.find(params, function(err, leadactors){
      if(err){
        cb(err, null)
        return
      }
      cb(null, leadactors)
      return
    })
  },

  findById: function(id,cb){
    LeadActor.findById(id, function(err, leadactor){
      if(err){
        cb(err, null)
        return
      }
      cb(null, leadactor)
      return
    })
  },

  create: function(params, cb){
    LeadActor.create(params, function(err, leadactor){
      if(err){
        cb(err, null)
        return
      }
      cb(null, leadactor)
      return
    })
  },

  update: function(id, params, cb){
    LeadActor.findByIdAndUpdate(id,params, function(err, leadactor){
      if(err){
        cb(err, null)
        return
      }
      cb(null, leadactor)
      return
    })
  },

  delete: function(id, cb){
    LeadActor.findByIdAndRemove(id, function(err){
      if(err){
        cb(err, null)
        return
      }
      cb(null, null)
      return
    })
  }

}
