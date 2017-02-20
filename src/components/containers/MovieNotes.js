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

  componentDidMount(){
    // console.log('componentDidUpdate')
    // let selectedMovie = this.props.movieList[this.props.selected]
    // if(selectedMovie == null)
    // console.log('no movie has been selected')
    // return
    //
    //
    // APIManager.get('/api/movienotes', {seletedMovie: selectedMovie._id}, (error, response)=>{
    //   if(error){
    //     alert('error' + error.message)
    //     return
    //   }
    //   // console.log('notes' + JSON.stringify(response.results))
    //
    //   let notes = response.results
    //   this.props.notesReceived(notes)
    // })
  }

  componentDidUpdate(){
    console.log('componentDidUpdate')
    let selectedMovie = this.props.movieList[this.props.selected]
    // if(selectedMovie == null){
    //   console.log('no selected zone')
    //   return
    // }
    console.log('SELECTED: ' + JSON.stringify(selectedMovie))
    console.log('selected zone ready: ' + selectedMovie._id)
    let notesArray = this.props.notesMap[selectedMovie._id]
    console.log("NOTES ARRAY: " + JSON.stringify(notesArray))
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
      // console.log('notes' + JSON.stringify(response.results))
      // this.setState({
      //   movieNotesLoaded: true
      // })

      let notes = response.results
      this.props.notesReceived(notes, selectedMovie)

    })
  }



  addNote(movieNote){

    console.log('click:' + JSON.stringify(movieNote))
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
        <div>


          <MovieDetails
                movieName={movieName}
                leadActor={leadActor}
                leadActress={leadActress}
                supportingActor={supportingActor}
                supportingActress={supportingActress}

              />

            <br /><br /><hr />
            <h4>Notes for <span style={{color:'green'}}>{movieName}: </span></h4>
          <ul style={{listStyleType:'none', padding:0}}>
          {movieNotesList}
        </ul>
        </div>
        <div>
          <h3>Add A Note:</h3>
          <CreateMovieNote movieName={movieName} createMovieNote={this.addNote.bind(this)} />
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
