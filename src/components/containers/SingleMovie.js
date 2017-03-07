import React, { Component } from 'react'
import superagent from 'superagent'
import { Link } from 'react-router'
import { Footer } from '../presentation'

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

				 console.log("MOVIE NAME: " + JSON.stringify(response.body))
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
				 let movieName = movie.title.toUpperCase()
				 console.log("SINGLE POSTER PATH: " + JSON.stringify(movieName))

				 updated['movieName'] = movieName
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
		let moviePoster = null
		let movie = this.state.singleMovie
		let actor = null
		if(movie !=null){
				actor = movie.castList.map((castMember, i)=>{
				moviePoster = (movie.posterpath!=null) ?
					<img src={`https://image.tmdb.org/t/p/w342/${movie.posterpath}`} />
					:
					<img style={{width:342, height:500}} src="/assets/img/nomovie.png" />

				let actorImage = (castMember.profile_path==null) ?
					<img style={{width:92,height:138,borderRadius:10}} src="/assets/img/actor_placeholder.jpg" />
					:
					<img style={{borderRadius:10, width:92,height:138,}} src={"http://image.tmdb.org/t/p/w92//"+castMember.profile_path} />

				return	<Link to={"/actor/"+castMember.name.toLowerCase()}>
									<li style={{float:'left',paddingRight:10, paddingBottom:20}} key={i}>{actorImage}<br />
										<span style={{fontSize:'.7em'}}>
											{castMember.name}<br />
										</span>
									</li>
								</Link>
				})
		}
		let content = (this.state.singleMovie != null) ?
		<div>
			<div className="container" style={{padding:50, border:'1px solid white',margin:'50px 30px'}}>
				<div className="row">
					<div className="col-md-4">
						<center>
							{moviePoster}<br /><br />
							<Link to = {"/movietrailer/"+this.props.params.id+"/"+movie.youtubeID}>
								<button className="btn btn-default">Watch Trailer</button>
							</Link>
						</center><br />
					</div>
					<div className="col-md-7 col-md-offset-1">
						<h1 style={{paddingTop:50}}>{movie.movieName}</h1>
						<p style={{fontSize:'1.1em'}}>{movie.runtime} min. |  {movie.status} | {movie.releaseDate} | ${movie.budget} budget</p>
						<h5><a target="_blank" href={"https://www.imdb.com/title/"+movie.imdbID+"/?ref_=nv_sr_1"}>IMDB</a>
						 <a style={{paddingLeft:30}} href={this.state.homepage} target="_blank" >{movie.homepage}</a></h5>
						 <hr />
						<h3>{movie.overview}</h3>
						<hr />
						<h2>CAST INCLUDES:</h2>
						<center><ul style={{listStyleType:'none', width:'80%'}}>{actor}</ul></center><br />
					</div>
				</div>
				<div className="row">
					<div className="col-md-12">
						<center>
								<button style={{background:'#269abc', marginTop:30}} className="btn btn-lg">
										<Link style={{color:'white'}} to = '/'>Home</Link>
								</button>
						</center>
					</div>
				</div>
			</div>
		</div>
		:
		null

    return(
      <div>
       {content}
			 <Footer />
      </div>
    )
  }
}

export default SingleMovie
