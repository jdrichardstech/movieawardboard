
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
		// console.log("MOVIENAME IN REDUCER: " + JSON.stringify(action.movie))
			updatedList.push(action.movie)

  
		 let removeArticles = (str) => {
				words = str.split(" ")
				if(words.length <= 1) return str
			  if( words[0] == 'A' || words[0] == 'THE' || words[0] == 'AN' )
			    return words.splice(1).join(" ")
			  	return str;
			}

      let compareList= (a,b) => {
				let movieTitleA=a.movieName
				let movieTitleB =b.movieName
				movieTitleA=removeArticles(a.movieName)
				console.log("MOVIENAME: " + JSON.stringify(a.movieName))
				movieTitleB=removeArticles(b.movieName)

       if (movieTitleA < movieTitleB)
         return -1;
       if (movieTitleA > bmovieTitleB)
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

			let removeArticle = (str) => {
				let words = str.split(" ")
				if(words.length <= 1)
					return str
				if( words[0] == 'A' || words[0] == 'THE' || words[0] == 'AN' )
					return words.splice(1).join(" ")
					return str
			}

			let compare= (a,b) => {
				let movieTitleA=a.movieName
				let movieTitleB =b.movieName
				movieTitleA=removeArticle(a.movieName)
				console.log("MOVIENAME: " + JSON.stringify(a.movieName))
				movieTitleB=removeArticle(b.movieName)

			 if (movieTitleA < movieTitleB)
				 return -1;
			 if (movieTitleA > movieTitleB)
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
