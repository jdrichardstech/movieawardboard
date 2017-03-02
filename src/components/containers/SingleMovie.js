import React, { Component } from 'react'
import superagent from 'superagent'
import { Link } from 'react-router'

class SingleMovie extends Component{

  constructor(){
    super()
    this.state={
			singleMovie:{}
		}
  }

  componentDidMount(){
    let url=
		`https://api.themoviedb.org/3/movie/${this.props.params.id}?api_key=4160bdc56f74445097c8012631f85743&append_to_response=videos`

	  superagent
	  .get(url)
	  .query(null)
	  .set('Accept', 'application/json')
	  .end((err, response) => {
	    if (err){
	      alert('ERROR: '+err)
	      return
	    }

    let movie = response.body
    let posterpath=movie.poster_path
    let youtubeID = null
    if(movie.videos['results'].length !=0){
       youtubeID= movie.videos['results'][0].key
    }else{
      youtubeID="novideo"
    }
    let budget=movie.budget
    let overview=movie.overview
    let popularity=movie.popularity
    let runtime=movie.runtime
    let voteCount = movie.vote_count
    let voteAverage = movie.vote_average
    let imdbID = movie.imdb_id
		let releaseDate = movie.release_date
		let status = movie.status
		let tagline = movie.tagline
		let homepage = movie.homepage
    // console.log("SINGLE POSTER PATH: " + posterpath)
		let updated = Object.assign({}, this.state.singleMovie)
		updated['posterpath'] = posterpath
		updated['youtubeID'] = youtubeID
		updated['budget'] = budget
		updated['overview'] = overview
		updated['popularity'] = popularity
		updated['runtime'] = runtime
		updated['voteCount'] = voteCount
		updated['voteAverage'] = voteAverage
		updated['imdbID'] = imdbID
		updated['releaseDate'] = releaseDate
		updated['status'] = status
		updated['tagline'] = tagline
		updated['homepage'] = homepage

    this.setState({
      singleMovie: updated
    })
    // console.log("SingleMovie " + JSON.stringify(this.state.singleMovie))
  })
}

  render(){
		let movie = this.state.singleMovie
		let content = (this.state.singleMovie != null) ?
		<center>
			<Link to = "/">Home</Link><br /><br />
				<img src={`https://image.tmdb.org/t/p/w342/${movie.posterpath}`} /><br /><br />
					<Link to = {"/movietrailer/"+this.props.params.id+"/"+movie.youtubeID}><button className="btn btn-default">Watch Trailer</button></Link><br /><br />
			<div>
				<h4>{movie.overview}</h4><br /><br />
				<h5>Runtime: {movie.runtime}</h5><br /><br />
				<h5>Budget: ${movie.budget}</h5><br /><br />
				<h5>Popularity: {movie.popularity}</h5><br /><br />
				<h5>Release Date: {movie.releaseDate}</h5><br /><br />
				<h5>Status: {movie.status}</h5><br /><br />
				<h5>Tag Line: {movie.tagline}</h5><br /><br />
				<h5>Homepage: <a href={this.state.homepage} target="_blank" >{movie.homepage}</a></h5><br /><br />
				<h5><span style={{paddingRight:20}}>Vote Count: {movie.voteCount}  </span>Vote Average: {movie.voteAverage}</h5><br /><br />
				<a target="_blank" href={"https://www.imdb.com/title/"+movie.imdbID+"/?ref_=nv_sr_1"}>IMDB Profile</a><br /><br />
			</div>
			<Link to = "/">Home</Link>
		</center>
		:
		null
		
    return(
      <div style={{marginTop:50, padding:'0 30% 20px 30%'}}>
       {content}
      </div>
    )
  }
}

export default SingleMovie
