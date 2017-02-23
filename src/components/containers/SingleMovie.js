import React, { Component } from 'react'
import superagent from 'superagent'
import { Link } from 'react-router'




class SingleMovie extends Component{

  constructor(){
    super()
    this.state={}
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

   // 	console.log('SINGLEMOVIE BODY: '+JSON.stringify(response.body))
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
    // console.log("SINGLE POSTER PATH: " + posterpath)

    this.setState({
      posterpath,
      youtubeID,
      budget,
      overview,
      popularity,
      runtime,
      voteCount,
      voteAverage,
      imdbID
    })
    // console.log("YOUTUBE ID: " + JSON.stringify(movie.videos['results'][0].key))
  })
}

  render(){
    return(
      <div style={{marginTop:50, padding:'0 30% 20px 30%'}}>
        <center>
        <Link to = "/">Home</Link><br /><br />
          <img src={`https://image.tmdb.org/t/p/w185/${this.state.posterpath}`} /><br /><br />
            <Link to = {"/movietrailer/"+this.props.params.id+"/"+this.state.youtubeID}><button className="btn btn-default">Watch Trailer</button></Link><br /><br />
						<div>
							<h4>{this.state.overview}</h4><br /><br />
							<h5>Runtime: {this.state.runtime}</h5><br /><br />
							<h5>Budget: ${this.state.budget}</h5><br /><br />
							<h5>Popularity: {this.state.popularity}</h5><br /><br />
							<h5><span style={{paddingRight:20}}>Vote Count: {this.state.voteCount}  </span>Vote Average: {this.state.voteAverage}</h5><br /><br />
							<a target="_blank" href={"https://www.imdb.com/title/"+this.state.imdbID+"/?ref_=nv_sr_1"}>IMDB Profile</a><br /><br />
						</div>

            <Link to = "/">Home</Link>
        </center>
      </div>
    )
  }
}

export default SingleMovie
