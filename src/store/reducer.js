import { UPDATE_MESSAGE } from './constants'


const initialState = {
  msg: "Yo"
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case UPDATE_MESSAGE:
      return {...state, msg: action.payload}
    // case 'DELETE_CONTACT':
    //   console.log('delete called', action.filteredArray)
    //   state.filteredArray = action.filteredArray
    //   return state
    // case 'GET_CONTACTS':
    //   state.contactArray = action.contactArray
    //   return state
    default:
      return state
  }
}

export default reducer