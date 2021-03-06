import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Main from './components/Main'
import { SingleMovie, MoviesNowPlaying, ActorInfo,Auth,CheckUser } from './components/containers'
// import MoviesNowPlaying from './components/containers/MoviesNowPlaying'
import { NominationInputs } from './components/layout'
import { MovieTrailer } from './components/presentation'
import store from './store/store'
import { Provider} from 'react-redux'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'

const app=(
  <Provider store ={store.configureStore()}>
    <Router history={browserHistory}>
      <Route path='/' component={Main}>
        <IndexRoute component={CheckUser}></IndexRoute>
	      <Route path="/nominations" component={NominationInputs}></Route>
	      <Route path="/moviesnowplaying" component={MoviesNowPlaying}></Route>
				<Route path="/singlemovie/:id" component={SingleMovie}></Route>
				<Route path="/movietrailer/:id/:youtubeID" component={MovieTrailer}></Route>
				<Route path="/actor/:actorName" component={ActorInfo}></Route>
  		</Route>
    </Router>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'))
