import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import moviesReducer from '../reducers/moviesReducer'
import notesReducer from '../reducers/notesReducer'
var store;

export default {

  configureStore: () => {
  const reducers = combineReducers({
  movies: moviesReducer,
  movieNotes:notesReducer
  })

  store = createStore(
  reducers,
  applyMiddleware(thunk)
  )
  return store
  },

  currentStore: () => {
  return store
  }
}
