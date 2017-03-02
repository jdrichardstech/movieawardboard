var mongoose = require('mongoose')

var LeadActorSchema = new mongoose.Schema({
  leadActorName:{type:String, default:''},
  timestamp:{type:Date, default:Date.now}
})

module.exports = mongoose.model('LeadActorSchema', LeadActorSchema)
