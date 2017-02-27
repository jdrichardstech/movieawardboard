import constants from '../constants/constants'
import { APIManager } from '../utils'

// const getRequest = (path, params, actionType)=>{
//   return(dispatch) =>
//     APIManager.get(path, params)
//     .then(response=>{
//       // console.log(JSON.stringify(response))
//       const payload = response.results || response.result || response.user
//       dispatch({
//         type: actionType,
//         payload: payload,
//         params: params
//       })
//       return response
//     })
//     .catch(err=>{
//       throw err
//     })
// }
//
// const postRequest = (path, params, actionType)=>{
//   return (dispatch) =>
//     APIManager.post(path, params)
//     .then(response=>{
//       const payload = response.results || response.result || response.user
//       dispatch({
//         type: actionType,
//         payload:payload,
//         params:params
//       })
//       return response
//     })
//     .catch(err => {
//       throw err
//     })
// }

export default{
  moviesReceived: (movies) => {
    return{
      type: constants.MOVIES_RECEIVED,
      movies: movies
    }
  },

	createMovie: (movie) => {
		return (dispatch) => {
			APIManager
			.post('/api/movie', movie)
			.then(response => {
				console.log('RESPONSE: '+JSON.stringify(response))

				dispatch({
					type: constants.MOVIE_CREATED,
					movie: movie
				})
			})
			.catch((err) => {
				console.log('ERROR: '+err)
			})
		}
	},

  movieCreated: (movie) => {
    return{
      type: constants.MOVIE_CREATED,
      movie: movie
    }
  },

  selectMovie: (selected) => {
    return{
      type: constants.SELECT_MOVIE,
      selectedMovie: selected
    }
  },

  noteCreated: (note) => {
    return{
      type:constants.NOTE_CREATED,
      note: note
    }
  },

  notesReceived: (notes, selectedMovie) => {
    return{
      type: constants.NOTES_RECEIVED,
      notes: notes,
      selectedMovie:selectedMovie
    }
  },
	createUser: (params) => {
		return (dispatch) => {
			dispatch({
				type:constants.APPLICATION_STATE,
				appStatus: 'loading',
				reducer: 'account'
			})

				console.log('params: '+ JSON.stringify(params))

			APIManager.post('/account/register', params, (err, response)=>{
				if(err){
					alert('Username Taken. Choose different username')
					return
				}
				const user = response.user
				console.log("user: " + JSON.stringify(user))
				dispatch({
					type: constants.CURRENT_USER_RECEIVED,
					user:user
				})
			})
		}
	},

	createLogin: (params) => {
		return(dispatch) => {
			dispatch({
				type:constants.APPLICATION_STATE,
				appStatus: 'loading',
				reducer: 'account'
			})

			APIManager.post('/account/login',params,(err, response)=>{
				if(err){
					alert(err.message)
					return
				}
				const user = response.user
				dispatch({
					type: constants.CURRENT_USER_RECEIVED,
					user:user
				})
			})
		}
	},

	fetchCurrentUser: (params) => {
		return(dispatch) => {
			dispatch({
				type:constants.APPLICATION_STATE,
				appstatus: 'loading',
				reducer: 'account'
			})
			APIManager.get('/account/currentuser', params,(err, response)=>{
				if(response==null){
					return
				}
				if(err){
					alert("Cannot get current user: " + err.message)
					return
				}
				const user = response.user
				dispatch({
					type: constants.CURRENT_USER_RECEIVED,
					user: user
				})
			})
		}
	},
	currentUserReceived: (user) => {
		return {
			type: constants.CURRENT_USER_RECEIVED,
			user: user
		}
	}
}
