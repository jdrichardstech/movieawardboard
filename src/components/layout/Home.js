import React, { Component } from 'react'
// import Movies from '../containers/Movies'
// import MovieNotes from '../containers/MovieNotes'
import { MovieDBInfo, MovieNotes, Movies, Header } from '../containers'
import NominationsUpdate from '../containers/NominationsUpdate'
import { Link } from 'react-router'

const Home = ()=>{
    return(
      <div>
        <Header />
        <div className="bg-color-light">
          <div className="container content-sm">
              <div className="row">
                <div className="col-md-3">
                <Movies />
                </div>
                <div className="col-md-9">
                  <div className="row news-v2 margin-bottom-50">
                    <div className="col-sm-6 sm-margin-bottom-30">
                      <div className="news-v2-badge" style={{backgroundColor:'black'}}>
                      </div>
                      <div className="news-v2-desc">
													<MovieDBInfo />
                          <MovieNotes />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="news-v2-badge">
                      </div>
                      <div className="news-v2-desc">
                          <NominationsUpdate />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
      </div>
    </div>
  )
}

export default Home
