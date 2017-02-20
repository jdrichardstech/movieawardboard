var LeadActress = require('../models/LeadActress')



module.exports = {

  find: function(params, cb){
    LeadActress.find(params, function(err, leadactresses){
      if(err){
        cb(err, null)
        return
      }
      cb(null, leadactresses)
      return
    })
  },

  findById: function(id,cb){
    LeadActress.findById(id, function(err, leadactress){
      if(err){
        cb(err, null)
        return
      }
      cb(null, leadactress)
      return
    })
  },

  create: function(params, cb){
    LeadActress.create(params, function(err, leadactress){
      if(err){
        cb(err, null)
        return
      }
      cb(null, leadactress)
      return
    })
  },

  update: function(id, params, cb){
    LeadActress.findByIdAndUpdate(id,params, function(err, leadactress){
      if(err){
        cb(err, null)
        return
      }
      cb(null, leadactress)
      return
    })
  },

  delete: function(id, cb){
    LeadActress.findByIdAndRemove(id, function(err){
      if(err){
        cb(err, null)
        return
      }
      cb(null, null)
      return
    })
  }

}
