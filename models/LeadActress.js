var mongoose = require('mongoose')


var LeadActressSchema = new mongoose.Schema({
  leadActressName:{type:String, default:''},
  timestamp:{type:Date, default:Date.now}
})



module.exports = mongoose.model('LeadActressSchema', LeadActressSchema)
