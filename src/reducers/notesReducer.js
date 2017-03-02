import constants from '../constants/constants'



var initialState = {
    map:{},
    note:'',
    movieNotesLoaded:false

  }



export default (state=initialState, action) => {
  let updated = Object.assign({}, state)
  switch(action.type){

    case constants.NOTE_CREATED:
    // let updatedList = Object.assign([], updated.list)
    // updatedList.push(action.note)
    // updated['list'] = updatedList


    return updated

    case constants.NOTES_RECEIVED:
    let updatedNotes = Object.assign({}, updated.map)

    // console.log('notes received from selectedMovie: ' + JSON.stringify(action.selectedMovie))
    let updatedMap = Object.assign({}, updated.map)
    let selectedMovieNotes = updatedMap[action.selectedMovie._id]

    if(selectedMovieNotes == null){
      selectedMovieNotes = []
    }else{
      selectedMovieNotes = Object.assign([], selectedMovieNotes)
    }
    //another way to do above selectedMovieNotes
    // let selectedMovieNotes = (updatedMap[action.selectedMovie._id]) ? Object.assign([], selectedMovieNotes) : []
    action.notes.forEach((note, i)=>{
      selectedMovieNotes.push(note)
    })
    updatedMap[action.selectedMovie._id]= selectedMovieNotes
    // console.log("SELECTEDMOVIENOTES***: "+ JSON.stringify(updatedMap[action.selectedMovie._id]))

    updated['map'] = updatedMap

    // updated['list'] = action.notes
    updated['movieNotesLoaded']=true
    // console.log('notes received: ' + JSON.stringify(updated))
    return updated

    case constants.SELECT_MOVIE:
      updated['movieNotesLoaded']=false
      return updated

    default:
      return state
  }
}
