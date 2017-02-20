
import constants from '../constants/constants'

var initialState = {

  selected:0,
    list:[]
}

export default (state=initialState, action) => {
  let updated = Object.assign({}, state)

  switch(action.type){
    case constants.SELECT_MOVIE:
      updated['selected'] = action.selectedMovie
      // console.log('selectedMovie: ' + JSON.stringify(updated))
      return updated
		case constants.MOVIE_CREATED:
     let updatedList = Object.assign([], updated.list)
     updatedList.push(action.movie)
     let compareList= (a,b) => {
      if (a.movieName < b.movieName)
        return -1;
      if (a.movieName > b.movieName)
        return 1;
      return 0;
    }
    let sortedNewMovies = updatedList.sort(compareList)
   	updated['list'] = sortedNewMovies
     // console.log('moviecreated: ' + JSON.stringify(updatedList))
   	return updated
		case constants.MOVIES_RECEIVED:
      // console.log('action.movies: '+ JSON.stringify(action.movies))
      let movies = action.movies

     	let compare= (a,b) => {
	      if (a.movieName < b.movieName)
	        return -1;
	      if (a.movieName > b.movieName)
	        return 1;
	      return 0;
    	}
      let sortedMovies = movies.sort(compare)
      updated['list'] = sortedMovies
      // console.log('*******List: ' + JSON.stringify(updated['list']))
      return updated
    default:
      return state
  }
}
