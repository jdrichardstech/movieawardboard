import React, { Component } from 'react'
import { CreateMovieNote, MovieNote, MovieDetails } from '../presentation'
import superagent from 'superagent'
import { APIManager } from '../../utils/'
import store from '../../store/store'
import actions from '../../actions/actions'
import { connect } from 'react-redux'

class MovieNotes extends Component{
  constructor(props){
    super(props)
    this.state={

    }
  }

  componentDidUpdate(){
    console.log('componentDidUpdate')
		if(this.props.movieList.length != 0){
			let selectedMovie = this.props.movieList[this.props.selected]
			let notesArray = this.props.notesMap[selectedMovie._id]
			if(notesArray != null){
				return
			}

			if(this.props.movieNotesLoaded==true){
				return
			}

			APIManager.get('/api/movienotes', {selectedMovieId: selectedMovie._id}, (error, response)=>{
				if(error){
					alert('error' + error.message)
					return
				}
				let notes = response.results
				this.props.notesReceived(notes, selectedMovie)

			})
		}
  }

  addNote(movieNote){
    // console.log('click:' + JSON.stringify(movieNote))
    let updatedMovieNote = Object.assign({}, movieNote)
    let selectedMovie = this.props.movieList[this.props.selected]
    updatedMovieNote['selectedMovieId'] = selectedMovie._id


    APIManager.post('api/movienotes',updatedMovieNote,(error, response)=>{
      if(error){
        alert(error)
        return
      }
    let note = response.result
    // this.props.noteCreated(note)
    this.props.notesReceived([note], selectedMovie)
    console.log('note with id: ' + JSON.stringify(note))
    })
	}

  render(){

    let selectedMovie = this.props.movieList[this.props.selected]
    let movieName,leadActor,leadActress, supportingActor, supportingActress, movieNotesList = null

    if(selectedMovie!=null){
      movieName = selectedMovie.movieName
      leadActor = selectedMovie.leadActor
      leadActress=selectedMovie.leadActress
      supportingActor=selectedMovie.supportingActor
      supportingActress=selectedMovie.supportingActress

      let notesForSelectedMovie = this.props.notesMap[selectedMovie._id]
    {/*look at video for this spot*/}
      if (notesForSelectedMovie != null){
        movieNotesList = notesForSelectedMovie.map((note, i)=>{
          return(
            <li key={i}>
              <MovieNote index={i}  isSelected={false}   currentNote={note} />
            </li>
            )
          })
        }
    }
    return(
      <div>
				<div className="news-v2-desc"style={{marginBottom:30}}>
					<MovieDetails
								movieName={movieName}
								leadActor={leadActor}
								leadActress={leadActress}
								supportingActor={supportingActor}
								supportingActress={supportingActress}
							/>
				</div>
				<div className="news-v2-desc"style={{marginBottom:30,paddingBottom:40}}>
         <h3>Add A Note for <span style={{color:'rgb(92, 184, 92)'}}> {movieName}:</span></h3>
				 <p>You may include anything you want to remember about actors, actresses or the movie itself</p><br />
				 <h5>Add Note:</h5>
         <CreateMovieNote movieName={movieName} createMovieNote={this.addNote.bind(this)} />
       	</div>
				<div>
					<div className="headline-v2">
						<h4>Notes for <span style={{color:'rgb(92, 184, 92)'}}>{movieName}: </span></h4>
					</div>
          <ul style={{listStyleType:'none', padding:0}}>
          	{movieNotesList}
        	</ul>
        </div>
      </div>
    )
  }
}

const stateToProps = (state) => {
  return{
    note: state.movieNotes.note,
    notesList: state.movieNotes.list,
    notesMap: state.movieNotes.map,
    movieNotesLoaded: state.movieNotes.movieNotesLoaded,
    movieList: state.movies.list,
    selected: state.movies.selected
  }
}

const dispatchToProps = (dispatch) => {
  return{
    noteCreated: (note) => dispatch(actions.noteCreated(note)),
    notesReceived: (notes, selectedMovie) => dispatch(actions.notesReceived(notes,selectedMovie))
  }
}

export default connect(stateToProps,dispatchToProps)(MovieNotes)
