var mongoose = require('mongoose')


var MovieSchema = new mongoose.Schema({
  movieName:{type:String, default:''},
  leadActor:{type:String, default:''},
  leadActress:{type:String, default:''},
  supportingActor:{type:String, default:''},
  supportingActress:{type:String, default:''},
  timestamp:{type:Date, default:Date.now}
})



module.exports = mongoose.model('MovieSchema', MovieSchema)
