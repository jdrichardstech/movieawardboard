var MovieController = require('./MovieController')
var LeadActorController = require('./LeadActorController')
var LeadActressController = require('./LeadActressController')
var SupportingActorController = require('./SupportingActorController')
var SupportingActressController = require('./SupportingActressController')
var OutstandingEnsembleController = require('./OutstandingEnsembleController')
var BestStuntsController = require('./BestStuntsController')
var MovieNotesController = require('./MovieNotesController')
var ProfileController = require('./ProfileController')
var AccountController = require('./AccountController')

module.exports = {
  movie: MovieController,
  leadactor : LeadActorController,
  leadactress:LeadActressController,
  supportingactor: SupportingActorController,
  supportingactress: SupportingActressController,
  outstandingensemble: OutstandingEnsembleController,
  beststunts: BestStuntsController,
  movienotes: MovieNotesController,
	profile: ProfileController,
	account: AccountController
}
