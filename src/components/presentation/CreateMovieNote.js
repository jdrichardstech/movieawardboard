import React, { Component } from 'react'




class CreateMovieNote extends Component{
  constructor(props){
    super(props)
    this.state={
      movieNote:{
        note:''
      }
    }
  }


  handleChange(event){
    let updatedNote = Object.assign({}, this.state.movieNote)
    updatedNote[event.target.id] = event.target.value
    this.setState({
      movieNote: updatedNote
    })
    // console.log('handleChange: ' + JSON.stringify(this.state.movieNote))
  }

  addNote(event){
    // console.log('addnote: '+ JSON.stringify(this.state.movieNote))
    this.props.createMovieNote(this.state.movieNote)
  }


  render(){
    return(
      <div>

        <input onChange={this.handleChange.bind(this)}type="text" id="note" placeholder="notes" className="form-control" /><br />
        <button onClick={this.addNote.bind(this)} className="btn btn-info">Submit</button>
      </div>
    )
  }
}


export default CreateMovieNote
