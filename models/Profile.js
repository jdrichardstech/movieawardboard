var mongoose = require('mongoose')

var ProfileSchema = new mongoose.Schema({
	username:{type:String,lowercase:true, trim:true,required:true, default:''},
	email:{type:String,lowercase:true, trim:true,required:true, default:''},
	profileImage:{type:String, default:''},
	password:{type:String,lowercase:true, trim:true,required:true, default:''},
	timestamp:{type:Date, default:Date.now}
})



ProfileSchema.methods.summary = function(){
	var summary = {
		username: this.username,
		timestamp: this.timestamp,
		email: this.email,
		profileImage: this.profileImage,
		id: this._id.toString()
	}

	return summary
}

module.exports = mongoose.model('ProfileSchema', ProfileSchema)
