var SupportingActress = require('../models/SupportingActress')

module.exports = {

  find: function(params, cb){
    SupportingActress.find(params, function(err, supportingactresses){
      if(err){
        cb(err, null)
        return
      }
      cb(null, supportingactresses)
      return
    })
  },

  findById: function(id,cb){
    SupportingActress.findById(id, function(err, supportingactress){
      if(err){
        cb(err, null)
        return
      }
      cb(null, supportingactress)
      return
    })
  },

  create: function(params, cb){
    SupportingActress.create(params, function(err, supportingactress){
      if(err){
        cb(err, null)
        return
      }
      cb(null, supportingactress)
      return
    })
  },

  update: function(id, params, cb){
    SupportingActress.findByIdAndUpdate(id,params, function(err, supportingactress){
      if(err){
        cb(err, null)
        return
      }
      cb(null, supportingactress)
      return
    })
  },

  delete: function(id, cb){
    SupportingActress.findByIdAndRemove(id, function(err){
      if(err){
        cb(err, null)
        return
      }
      cb(null, null)
      return
    })
  }
}
