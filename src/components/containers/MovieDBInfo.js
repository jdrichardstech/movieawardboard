import React, { Component } from 'react'
import ajax from 'superagent'
import { connect } from 'react-redux'
import store from '../../store/store'
import actions from '../../actions/actions'
import { Link } from 'react-router'
import superagent from 'superagent'
import styles from './styles'

class MovieDBInfo extends Component{
  constructor(props){
    super(props)
		this.toggleHover=this.toggleHover.bind(this)
    this.state={
      movie:[],
      posterPath:'',
      hover: false
    }
  }

  componentDidUpdate(){
      // console.log('MOVIELIST DBINFO: '+ JSON.stringify(this.props.movieList[this.props.selected]))
    let selectedMovie = this.props.movieList[this.props.selected]
    if(this.state.selected==this.props.selected){
    return
    }
    // console.log("DBINFO LEAD:" +JSON.stringify(this.props.movieList[0].leadActor))
    // console.log("DBINFO URL:" +JSON.stringify(selectedMovie))
		if(this.props.movieList.length !=0){
			let movieName=selectedMovie.movieName
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

				// console.log('DBINFO MOVIEDB NEW: '+JSON.stringify(response.body))
				let movie = response.body.results
				let movieDBSelectedMovie=movie[0]
				// console.log('MOVIEDB ID NEW: '+JSON.stringify(movieDBSelectedMovie))
				let posterPath = null
				let overview = null
				let popularity=null
				let voteCount = null
				let moviedBId = null
				if(movieDBSelectedMovie != undefined){
					posterPath=movieDBSelectedMovie.poster_path
					overview=movieDBSelectedMovie.overview
		 			popularity=movieDBSelectedMovie.popularity
		 			voteCount = movieDBSelectedMovie.vote_count
		 			moviedBId = movieDBSelectedMovie.id
				}
				let selected = this.props.selected

				this.setState({
					movie,
					posterPath,
					overview,
					popularity,
					voteCount,
					moviedBId,
					selected
				})
			})
		}
  }

	toggleHover(){
		this.setState({
			hover:!this.state.hover
		})
	}

  render(){
		let linkStyle=
			(!this.state.hover) ?
				linkStyle=<div><Link to={"/singlemovie/"+this.state.moviedBId}><img style={linkStyle} src={`http://image.tmdb.org/t/p/w185/${this.state.posterPath}`} onMouseEnter={this.toggleHover}  /></Link><br /><span style={{color:'#269abc'}}>click image to view movie details</span></div>
			  :
				 linkStyle = <div ><Link style={{background:'white',zIndes:20}} to={"/singlemovie/"+this.state.moviedBId}><img style={linkStyle} src={`http://image.tmdb.org/t/p/w185/${this.state.posterPath}`}   onMouseOut={this.toggleHover} /></Link><br />click image to view movie details</div>

		let content = (this.state.moviedBId != null) ?
			<div>
				<center>
					{linkStyle}
					<br /><br />
					<h5 style={{color:"#999"}}>Overview:<br /><span style={{color:'#5cb85c', fontStyle:'oblique'}}> {this.state.overview}</span></h5>
					<br /><h5 style={{color:'#999'}}> Popularity: <span style={{fontSize:'1em', color:'#5cb85c', paddingRight:20}}>{this.state.popularity}</span>
					Vote Count:<span style={{fontSize:'1em', color:'#5cb85c'}}> {this.state.voteCount}</span></h5>
				</center><br /><br /><br />
			</div>
			:
			<div><center><img src="/assets/img/noInfo.jpg" /></center></div>

    return(
      <div className="news-v2-desc"style={{marginBottom:30}}>
        {content}
      </div>
    )
  }
}

const stateToProps = (state)=>{
  return{
    movieList: state.movies.list,
    selected: state.movies.selected
  }
}

const dispatchToProps = (dispatch)=>{
  return{

  }
}

export default connect(stateToProps, dispatchToProps) (MovieDBInfo)
