var mongoose = require('mongoose')

var OutstandingEnsembleSchema = new mongoose.Schema({
  outstandingEnsembleMovie:{type:String, default:''},
  timestamp:{type:Date, default:Date.now}
})

module.exports = mongoose.model('OutstandingEnsembleSchema', OutstandingEnsembleSchema)
