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

	clearValues(){
		this.refs.movieName.value=''
		this.refs.leadActor.value=''
		this.refs.supportingActor.value=''
		this.refs.leadActress.value=''
		this.refs.supportingActress.value=''
	}

  updateMovie(event){
    let updatedMovie = Object.assign({}, this.state.movie)
    updatedMovie[event.target.id] = event.target.value
    this.setState({
      movie: updatedMovie
    })
  }

  submitMovie(){
		if(this.state.movie.movieName == ''){
			alert("YOU MUST ENTER A MOVIE NAME")
			return
		}
    let updatedMovie = Object.assign({}, this.state.movie)
		updatedMovie['movieName'] = updatedMovie.movieName.toUpperCase()
		// console.log("MOVIENAME: " + (updatedMovie['movieName']))
    this.props.onCreateMovie(updatedMovie)
		this.clearValues()
  }

  render(){
    return(
      <div>
				<label>Movie NAME:</label>
	      <input onChange ={this.updateMovie.bind(this)} className="form-control" type="text" ref="movieName" id="movieName" /><br />
				<label>Lead ACTOR:</label>
	      <input onChange ={this.updateMovie.bind(this)} className="form-control" type="text" ref="leadActor" id="leadActor" /><br />
				<label>Supporting ACTOR:</label>
			 	<input onChange ={this.updateMovie.bind(this)} className="form-control" type="text" ref="supportingActor" id="supportingActor" /><br />
				 <label>Lead ACTRESS:</label>
	      <input onChange ={this.updateMovie.bind(this)} className="form-control" type="text" ref="leadActress" id="leadActress" /><br />
				<label>Supporting ACTRESS:</label>
	      <input onChange ={this.updateMovie.bind(this)} className="form-control" type="text" ref="supportingActress" id="supportingActress" /><br />
	      <button onClick={this.submitMovie.bind(this)} className="btn btn-info">Submit Movie</button>
      </div>
    )
  }
}

export default CreateMovie
