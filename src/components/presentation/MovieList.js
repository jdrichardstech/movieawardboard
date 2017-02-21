import React, { Component } from 'react'

class MovieList extends Component{
  selectMovie(event){
    // event.preventDefault()
    this.props.selectMovie(this.props.index)
  }
  render(){
    const movieTitle = (this.props.isSelected) ? <a style={{color:'green'}} href="#">{this.props.currentMovie.movieName}</a> : <a href="#">{this.props.currentMovie.movieName}</a>
    return(
      <div>
          <span onClick={this.selectMovie.bind(this)}>{movieTitle}</span>
      </div>
    )
  }
}

export default MovieList
