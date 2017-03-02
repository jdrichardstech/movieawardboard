var mongoose = require('mongoose')

var MovieNotesSchema = new mongoose.Schema({
selectedMovieId:{type:String, default:''},
note:{type: String, default:''}
})

module.exports = mongoose.model('MovieNotesSchema', MovieNotesSchema)
