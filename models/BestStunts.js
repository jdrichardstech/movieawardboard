var mongoose = require('mongoose')

var BestStuntsSchema = new mongoose.Schema({
  bestStuntsMovie:{type:String, default:''},
  timestamp:{type:Date, default:Date.now}
})

module.exports = mongoose.model('BestStuntsSchema', BestStuntsSchema)
