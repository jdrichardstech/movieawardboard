import React, { Component } from 'react'
import { Link } from 'react-router'
import Header from '../containers/Header'
import superagent from 'superagent'
import { Footer } from '../presentation'



class MoviesNowPlaying extends Component{
  constructor(props){
    super(props)
    this.state={
      movies:[]
    }
  }

  componentDidMount(){
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
	        return <div className="col-md-3" key={i}>
	          <li style={{marginBottom:20}} ><h6>No Image</h6><br /><h6>{movie.title}</h6> </li>
	        </div>
	      }else{
					return <div style={{float:'left'}} className="col-md-3" style={{marginBottom:50}} key={i}>
											<li><Link to = {`/singlemovie/${movie.id}`}><img style={{width:185,height:275}} src={`http://image.tmdb.org/t/p/w185/${movie.poster_path}`} /></Link> </li>
								 </div>
				}
      })
    }

    return(
      <div>
	      <Header />
	      <br />
		    <div className="container">
		      <center>
		        <h1>Now In Theatres</h1>
		        <h4>Movies currently released</h4>
						<p style={{fontSize:'.9em'}}>(click on movie poster to get more information)</p>
		        <hr style={{width:'40%'}}/>
		      </center>
		      <br />
		          <div className="clearfix">
								<div className="row">
								<div className="col-md-12">
			            <ul style={{listStyleType:'none'}}>
			              {movieList}
			            </ul>
								</div>
		          </div>
							</div>
		          {/*<a target="_blank" href="http://api.themoviedb.org/3/movie/330459/videos?api_key=4160bdc56f74445097c8012631f85743">Trailer</a>
		          */}
		      </div>
					<Footer />
      </div>
    )
  }
}

export default MoviesNowPlaying
