var MovieNotes = require('../models/MovieNotes')

module.exports = {

  find: function(params, cb){
    MovieNotes.find(params, function(err, notes){
      if(err){
        cb(err, null)
        return
      }
      cb(null, notes)
      return
    })
  },

  findById: function(id,cb){
    MovieNotes.findById(id, function(err, notes){
      if(err){
        cb(err, null)
        return
      }
      cb(null, notes)
      return
    })
  },

  create: function(params, cb){

    MovieNotes.create(params, function(err, note){
      if(err){
        cb(err, null)
        return
      }
      cb(null, note)
      return
    })
  },

  update: function(id, params, cb){
    MovieNotes.findByIdAndUpdate(id,params, function(err, note){
      if(err){
        cb(err, null)
        return
      }
      cb(null, note)
      return
    })
  },

  delete: function(id, cb){
    MovieNotes.findByIdAndRemove(id, function(err){
      if(err){
        cb(err, null)
        return
      }
      cb(null, null)
      return
    })
  }

}
