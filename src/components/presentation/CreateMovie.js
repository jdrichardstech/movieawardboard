import React, { Component } from 'react'




class CreateMovie extends Component{
  constructor(props){
    super(props)
		this.createName = this.createName.bind(this)
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

	createName(actorName){
		var nameArray = actorName.split(' ')
		console.log("nameArray: " + JSON.stringify(nameArray))
		var newNameArray = nameArray.map((letter)=> {
			return letter.charAt(0).toUpperCase() + letter.slice(1).toLowerCase()
		})
		console.log("newNameArray: " + JSON.stringify(newNameArray))
		var refactoredName = newNameArray.join(' ')
		console.log('refactoredName: ' + JSON.stringify(refactoredName))
		return refactoredName
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
		if(updatedMovie['leadActor']!=''){
			updatedMovie['leadActor'] = this.createName(updatedMovie['leadActor'])
		}
		if(updatedMovie['leadActress']!=''){
			updatedMovie['leadActress'] = this.createName(updatedMovie['leadActress'])
		}
		if(updatedMovie['supportingActor']!=''){
			updatedMovie['supportingActor'] = this.createName(updatedMovie['supportingActor'])
		}
		if(updatedMovie['supportingActress']!=''){
			updatedMovie['supportingActress'] = this.createName(updatedMovie['supportingActress'])
		}

		console.log(updatedMovie['leadActor'])
		// console.log("MOVIENAME: " + (updatedMovie['movieName']))
    this.props.onCreateMovie(updatedMovie)
		this.clearValues()
  }

  render(){
    return(
      <div>
				<label><h5>Movie NAME (required):</h5></label>
	      <input onChange ={this.updateMovie.bind(this)} className="form-control" type="text" ref="movieName" id="movieName" /><br />
				<label><h5>Lead ACTOR:</h5></label>
	      <input onChange ={this.updateMovie.bind(this)} className="form-control" type="text" ref="leadActor" id="leadActor" /><br />
				<label><h5>Supporting ACTOR:</h5></label>
			 	<input onChange ={this.updateMovie.bind(this)} className="form-control" type="text" ref="supportingActor" id="supportingActor" /><br />
				 <label><h5>Lead ACTRESS:</h5></label>
	      <input onChange ={this.updateMovie.bind(this)} className="form-control" type="text" ref="leadActress" id="leadActress" /><br />
				<label><h5>Supporting ACTRESS:</h5></label>
	      <input onChange ={this.updateMovie.bind(this)} className="form-control" type="text" ref="supportingActress" id="supportingActress" /><br />
	      <button onClick={this.submitMovie.bind(this)} className="btn btn-info">Submit Movie</button>
      </div>
    )
  }
}

export default CreateMovie
