import React, { Component, PropTypes } from 'react'
import superagent from 'superagent'
import { Link } from 'react-router'

class SearchForAMovie extends Component{
	constructor(){
		super()
		this.state={
			updated:{
				search:null,
				movieId:null
			}
		}
	}


	updateSearch(event){
		// console.log("SearchForAMovie: " + JSON.stringify(event.target.value))
		let updated = Object.assign({}, this.state.updated)
		updated['search'] = event.target.value
		this.setState({
			updated:updated
		})
	}

	submitSearch(event){
		event.preventDefault()
		// console.log("STATE: " + JSON.stringify(this.state.updated.search))
		if(this.state.updated.search == null){
			swal({
				title:"Nothing Entered!",
				text:"You must enter a movie name",
				type:"error"
			})
		}else{
			let movieName=this.state.updated.search

			let urlMovieName = movieName.split(' ').join('%20')
			var url = `https://api.themoviedb.org/3/search/movie?api_key=4160bdc56f74445097c8012631f85743&language=en-US&query=${urlMovieName}&page=1&include_adult=false`

			superagent
			.get(url)
			.query(null)
			.set('Accept', 'application/json')
			.end((err, response) => {
				if (err){
					alert('ERROR: '+err)
					return
				}
				let movie = response.body.results
				let movieId =null
				if(movie != null){
					movieId = movie[0].id
					this.context.router.push('/singlemovie/'+movieId)
					this.refs.movieName.value=''
					this.setState({
						search:null,
						movieId:null
					})
					// let updated = Object.assign({}, this.state.updated)
					// updated['movieId'] = movieId
					// console.log("MOVIE ID: " + JSON.stringify(movieId))
					// this.setState({
					// 	updated:updated
					// })
					// console.log("UPDATED: " + JSON.stringify(updated))
				}

		})
		}

}

	render(){
		let link = (this.state.updated.movieId !=null)? <Link to ={"/singlemovie/"+this.state.updated.movieId}>Search</Link>
		:
		<span>Empty</span>
		return(
			<div>
				<h2>Search for any Movie:</h2>
				<p>Enter name of any movie & click 'Search for Movie' to find out more information about it and/or watch the trailer<br /> OR <br /> Click 'Now Playing in Theatres to view current releases'</p>
				<input onChange={this.updateSearch.bind(this)} type="text" ref="movieName" className="form-control" /><br />
				<button style={{marginRight:10}} onClick={this.submitSearch.bind(this)} className="btn btn-success">Search For Movie</button>
				<button className="btn btn-info" style={{background:'#269abc'}}><Link style={{color:'white'}} to = '/moviesnowplaying'>Now Playing in Theatres</Link></button>
			</div>
		)
	}
}

SearchForAMovie.contextTypes={
	router:PropTypes.object
}

export default SearchForAMovie
