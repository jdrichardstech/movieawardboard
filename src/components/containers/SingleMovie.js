import React, { Component } from 'react'
import superagent from 'superagent'
import { Link } from 'react-router'

class SingleMovie extends Component{

  constructor(){
    super()
    this.state={

			singleMovie:{
				castList:[]
			}
		}
  }

  componentDidMount(){
    let url=
		`https://api.themoviedb.org/3/movie/${this.props.params.id}?api_key=4160bdc56f74445097c8012631f85743&append_to_response=videos`



		let updated = Object.assign({}, this.state.singleMovie)
	  superagent
	  .get(url)
	  .query(null)
	  .set('Accept', 'application/json')
	  .end((err, response) => {
	    if (err){
	      alert('ERROR: '+err)
	      return
	    }

		let castURL = `https://api.themoviedb.org/3/movie/${this.props.params.id}/credits?api_key=4160bdc56f74445097c8012631f85743`
			superagent
			.get(castURL)
			.query(null)
			.set('Accept', 'application/json')
		  .end((err, res) => {
		    if (err){
		      alert('ERROR: '+err)
		      return
		    }
				let credits = res.body.cast
				// console.log("CREDITS: " + JSON.stringify(credits))
				let castList = []
				credits.map((castMember, i) => {
					if(i < 12){
						castList.push(castMember)
					}
				})

				 console.log("INNER CAST: " + JSON.stringify(updated))
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
				 updated['castList']=castList

				 this.setState({
					 singleMovie: updated
				 })
					console.log("SingleMovie " + JSON.stringify(this.state.singleMovie))
			})
  })
}

  render(){

		let movie = this.state.singleMovie
		let actor = null
		if(movie !=null){

			actor = movie.castList.map((castMember, i)=>{
				let actorImage = (castMember.profile_path==null)? <img style={{width:92,height:138,borderRadius:10}} src="/assets/img/actor_placeholder.jpg" />: <img style={{borderRadius:10}} src={"http://image.tmdb.org/t/p/w92//"+castMember.profile_path} />
			return	<Link to={"/actor/"+castMember.name.toLowerCase()}>
								<li style={{float:'left', paddingRight:10}} key={i}>{actorImage}<br />
									<span>
										{castMember.name}<br />
										"{castMember.character}"
									</span>
								</li>
							</Link>
			})
		}
		let content = (this.state.singleMovie != null) ?

		<center>
			<Link to = "/">Home</Link><br /><br />
				<Link to = {`/singlemovie/${movie.id}`}><img src={`https://image.tmdb.org/t/p/w185/${movie.posterpath}`} /></Link><br /><br />
					<Link to = {"/movietrailer/"+this.props.params.id+"/"+movie.youtubeID}><button className="btn btn-default">Watch Trailer</button></Link><br /><br />
			<div>
				<h4>{movie.overview}</h4><br /><br />
				<ul style={{listStyleType:'none'}}>{actor}</ul><br />
				<h5 style={{clear:'left'}}>Runtime: {movie.runtime}</h5><br /><br />
				<h5>Budget: ${movie.budget}</h5><br /><br />

				<h5>Release Date: {movie.releaseDate}</h5><br /><br />
				<h5>Status: {movie.status}</h5><br /><br />

				<h5>Homepage: <a href={this.state.homepage} target="_blank" >{movie.homepage}</a></h5><br /><br />

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
