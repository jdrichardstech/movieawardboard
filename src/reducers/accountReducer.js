import constants from '../constants/constants'

var initialState = {
  user:null,
  appStatus:'ready'
}

export default (state = initialState, action) => {
  var updated = Object.assign({}, state)

  switch(action.type){
    case constants.CURRENT_USER_RECEIVED:
     updated['user']=action.user
    //  console.log("New User: " + JSON.stringify(updated['user']))
    return updated

    default:
    return state
  }
}
