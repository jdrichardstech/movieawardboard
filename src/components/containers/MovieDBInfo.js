import React, { Component } from 'react'
import ajax from 'superagent'
import { connect } from 'react-redux'
import store from '../../store/store'
import actions from '../../actions/actions'
import { Link } from 'react-router'
import superagent from 'superagent'

class MovieDBInfo extends Component{
  constructor(props){
    super(props)
    this.state={
      movie:[],
      posterPath:'',
      flag: false
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
      let posterPath=movieDBSelectedMovie.poster_path
      let overview=movieDBSelectedMovie.overview
      let popularity=movieDBSelectedMovie.popularity
      let voteCount = movieDBSelectedMovie.vote_count
      let moviedBId = movieDBSelectedMovie.id
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
        // console.log("STATE AFTER OVERVIEW " + JSON.stringify(this.state.posterPath))
    })
  }

  render(){

    return(
      <div>
        <div>
          <center>
          <Link to={"/singlemovie/"+this.state.moviedBId}><img src={`http://image.tmdb.org/t/p/w185/${this.state.posterPath}`} /></Link>
          <br /><br />
          <p style={{fontSize:'.9em', color:"#999"}}>Overview:<br /><span style={{color:'#5cb85c', fontStyle:'oblique'}}> {this.state.overview}</span></p>
          <br /><p style={{fontSize:'.7em', color:'#999'}}> Popularity: <span style={{fontSize:'1em', color:'#5cb85c', paddingRight:20}}>{this.state.popularity}</span>
          Vote Count:<span style={{fontSize:'1em', color:'#5cb85c'}}> {this.state.voteCount}</span></p>
        </center><br /><br /><br />
        </div>
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
