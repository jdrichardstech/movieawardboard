var mongoose = require('mongoose')

var ProfileSchema = new mongoose.Schema({
	username:{type:String,lowercase:true, trim:true,required:true, default:''},
	email:{type:String,lowercase:true, trim:true,required:true, default:''},
	profileImage:{type:String, default:''},
	password:{type:String,lowercase:true, trim:true,required:true, default:''},
	timestamp:{type:Date, default:Date.now}
})

module.exports = mongoose.model('ProfileSchema', ProfileSchema)
