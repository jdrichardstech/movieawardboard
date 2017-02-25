import constants from '../constants/constants'
import { APIManager } from '../utils'

const getRequest = (path, params, actionType)=>{
  return(dispatch) =>
    APIManager.get(path, params)
    .then(response=>{
      // console.log(JSON.stringify(response))
      const payload = response.results || response.result || response.user
      dispatch({
        type: actionType,
        payload: payload,
        params: params
      })
      return response
    })
    .catch(err=>{
      throw err
    })
}

const postRequest = (path, params, actionType)=>{
  return (dispatch) =>
    APIManager.post(path, params)
    .then(response=>{
      const payload = response.results || response.result || response.user
      dispatch({
        type: actionType,
        payload:payload,
        params:params
      })
      return response
    })
    .catch(err => {
      throw err
    })
}

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
  }
}
