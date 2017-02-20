import React, { Component } from 'react'
import ajax from 'superagent'
import { Link } from 'react-router'
import Header from '../containers/Header'



class MoviesNowPlaying extends Component{
  constructor(props){
    super(props)
    this.state={
      movies:[]
    }
  }

  componentDidMount(){
    //this is to search for a particular movie
    ajax.get('https://api.themoviedb.org/3/search/movie?api_key=4160bdc56f74445097c8012631f85743&language=en-US&query=Star%20Wars&page=1&include_adult=false')
    //latest movies
    ajax.get('https://api.themoviedb.org/3/movie/now_playing?api_key=4160bdc56f74445097c8012631f85743&language=en-US&page=1')

      .end((error, response) => {
          if (!error && response) {
              let movies = response.body.results
              this.setState({
                movies:movies
              })
              console.log("MOVIES: " + JSON.stringify(this.state.movies))
          } else {
              console.log('There was an error fetching from Movie', error);
          }
      })
  }
  render(){


    let movieList = null
    if(this.state.movies!=null){
      let movies = this.state.movies

      movieList=  movies.map((movie, i)=>{
      if(movie.poster_path==null){
        return <div className="col-md-3">
          <li style={{marginBottom:20}} key={i}><h6>No Image</h6><br /><h6>{movie.title}</h6> </li>
        </div>
      }
        return <div className="col-md-3">
          <li style={{marginBottom:50}} key={i}><Link to = {`/${movie.title}`}><img src={`http://image.tmdb.org/t/p/w185/${movie.poster_path}`} /></Link> </li>
        </div>
      })
    }


    return(
      <div>
      <Header />
    <div className="container">
      <h1> Now Playing</h1>
          <div className="clearfix">
            <ul style={{listStyleType:'none'}}>
              {movieList}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoviesNowPlaying
