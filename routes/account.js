var express = require('express')
var router = express.Router()
var ProfileController = require('../controllers/ProfileController')
var AccountController = require('../controllers/AccountController')
var bcrypt = require('bcryptjs')

router.get('/:action', function(req, res, next){

	var action = req.params.action
	if (action == 'logout'){
		req.session.reset()
		res.json({
			confirmation: 'success',
			message: 'Bye!'
		})
		return
	}

	if (action == 'currentuser'){
		AccountController.currentUser(req)
		.then(function(result){
			if(result==null){
				res.json({
					confiramtion:'fail',
					message:"No one signed in"
				})
				return
			}
			res.json({
				confirmation: 'success',
				user: result
			})
		})
		.catch(function(err){
			res.json({
				confirmation: 'fail',
				message: err.message
			})
			return
		})
	}
})

router.post('/:action', function(req, res, next){

	var action = req.params.action
	if (action == 'register'){
		ProfileController.create(req.body, function(err, result){
			if (err){
				res.json({
					confirmation: 'fail',
					message: err.message
				})
				return
			}

			req.session.user = result._id
			res.json({
				confirmation: 'success',
				user: result
			})
		})
	}

	if (action == 'login'){
		var params = {username: req.body.username}
		ProfileController.find(params, function(err, results){
			if (err){
				res.json({
					confirmation: 'fail',
					message: err.message
				})
				return
			}

			if (results.length == 0){
				res.json({
					confirmation: 'fail',
					message: 'Username does not exist. Check your spelling.'
				})

				return
			}

			var profile = results[0]

			var isPasswordCorrect = bcrypt.compareSync(req.body.password, profile.password)
				console.log("password: " + JSON.stringify(profile.password+" "+ req.body.password))
			// if (isPasswordCorrect == false){
			// 	res.json({
			// 		confirmation: 'fail',
			// 		message: 'Wrong password'
			// 	})
			//
			// 	return
			// }

			if(req.body.password != profile.password){
				res.json({
			 			confirmation: 'fail',
				 		message: 'Wrong password.'
				 	})
					return
			}

			req.session.user = profile._id

			res.json({
				confirmation: 'success',
				user: profile
			})
		})

	}
})


module.exports = router
