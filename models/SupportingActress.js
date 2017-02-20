var mongoose = require('mongoose')


var SupportingActressSchema = new mongoose.Schema({
  supportingActressName:{type:String, default:''},
  timestamp:{type:Date, default:Date.now}
})



module.exports = mongoose.model('SupportingActressSchema', SupportingActressSchema)
