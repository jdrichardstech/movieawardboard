import constants from '../constants/constants'



export default{
  moviesReceived: (movies) => {
    return{
      type: constants.MOVIES_RECEIVED,
      movies: movies
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
