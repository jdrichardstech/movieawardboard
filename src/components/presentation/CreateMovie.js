import React, { Component } from 'react'




class CreateMovie extends Component{
  constructor(props){
    super(props)
    this.state={
      movie:{
        movieName:'',
        leadActor:'',
        leadActress:'',
        supportingActor:'',
        supportingActress:''
      },
      list:[]
    }
  }

  updateMovie(event){
    let updatedMovie = Object.assign({}, this.state.movie)
    updatedMovie[event.target.id] = event.target.value
    this.setState({
      movie: updatedMovie
    })
  }

  submitMovie(){
    let updatedMovie = Object.assign({}, this.state.movie)
    this.props.onCreateMovie(updatedMovie)
  }

  render(){
    return(
      <div>
      <input onChange ={this.updateMovie.bind(this)} className="form-control" type="text" id="movieName" placeholder="movie name" /><br />
      <input onChange ={this.updateMovie.bind(this)} className="form-control" type="text" id="leadActor" placeholder="leadActor" /><br />
      <input onChange ={this.updateMovie.bind(this)} className="form-control" type="text" id="leadActress" placeholder="leadActress" /><br />
      <input onChange ={this.updateMovie.bind(this)} className="form-control" type="text" id="supportingActor" placeholder="supportingActor" /><br />
      <input onChange ={this.updateMovie.bind(this)} className="form-control" type="text" id="supportingActress" placeholder="supportingActress" /><br />
      <button onClick={this.submitMovie.bind(this)} className="btn btn-info">Submit Movie</button>
      </div>
    )
  }
}

export default CreateMovie
