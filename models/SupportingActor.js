var mongoose = require('mongoose')


var SupportingActorSchema = new mongoose.Schema({
  supportingActorName:{type:String, default:''},
  timestamp:{type:Date, default:Date.now}
})



module.exports = mongoose.model('SupportingActorSchema', SupportingActorSchema)
