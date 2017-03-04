import React, { Component } from 'react'

class MovieList extends Component{
  selectMovie(event){
    // event.preventDefault()
    this.props.selectMovie(this.props.index)
  }
  render(){
    const movieTitle = (this.props.isSelected) ? <a style={{color:'rgb(92, 184, 92)'}} href="#">{this.props.currentMovie.movieName}</a> : <a style={{color:'#31b0d5'}} href="#">{this.props.currentMovie.movieName}</a>
    return(
      <div>
          <h4 onClick={this.selectMovie.bind(this)}>{movieTitle}</h4>
      </div>
    )
  }
}

export default MovieList
