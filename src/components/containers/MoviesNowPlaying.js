import React, { Component } from 'react'
import { Link } from 'react-router'
import Header from '../containers/Header'
import superagent from 'superagent'



class MoviesNowPlaying extends Component{
  constructor(props){
    super(props)
    this.state={
      movies:[]
    }
  }

  componentDidMount(){
    //this is to search for a particular movie
    // ajax.get('https://api.themoviedb.org/3/search/movie?api_key=4160bdc56f74445097c8012631f85743&language=en-US&query=Star%20Wars&page=1&include_adult=false')
    //latest movies
    var url = 'https://api.themoviedb.org/3/movie/now_playing?api_key=4160bdc56f74445097c8012631f85743&language=en-US&page=1'

    superagent
    .get(url)
    .query(null)
    .set('Accept', 'application/json')
    .end((err, response) => {
      if (err){
        alert('ERROR: '+err)
        return
      }

      console.log('moviesnowplaying: ' +JSON.stringify(response.body.results))
      let movies = response.body.results
      this.setState({
        movies:movies
      })
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
          <li style={{marginBottom:50}} key={i}><Link to = {`/singlemovie/${movie.id}`}><img src={`http://image.tmdb.org/t/p/w185/${movie.poster_path}`} /></Link> </li>
    	</div>
      })
    }

    return(
      <div>
	      <Header />
	      <br />
		    <div className="container">
		      <center>
		        <h1>Now In Theatres</h1>

		        <h4>Movies currently released for public viewing</h4>
		        <hr style={{width:'40%'}}/>
		      </center>
		      <br />
		          <div className="clearfix">
		            <ul style={{listStyleType:'none'}}>
		              {movieList}
		            </ul>
		          </div>
		          {/*<a target="_blank" href="http://api.themoviedb.org/3/movie/330459/videos?api_key=4160bdc56f74445097c8012631f85743">Trailer</a>
		          */}
		      </div>
      </div>
    )
  }
}

export default MoviesNowPlaying
