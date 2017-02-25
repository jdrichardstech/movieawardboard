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
    console.log('addnote: '+ JSON.stringify(this.state.movieNote))
		if(this.state.movieNote.note==''){
			swal({
				title:'Oops!',
				text:'You must enter a note',
				type:'error'
			})
			return
		}
    this.props.createMovieNote(this.state.movieNote)
		let updated = Object.assign({}, this.state.movieNote)
		updated['note'] = ''
		this.setState({
			movieNote: updated
		})
		this.refs.note.value=''
  }

  render(){
    return(
      <div>

        <input onChange={this.handleChange.bind(this)}type="text" ref="note" id="note" className="form-control" /><br />
        <button onClick={this.addNote.bind(this)} className="btn btn-info">Submit</button>
      </div>
    )
  }
}

export default CreateMovieNote
