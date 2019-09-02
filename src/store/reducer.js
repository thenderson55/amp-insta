
const initialState = {
  user: "",
  profile: "",
  avatar: "",
  msg: "Yo"
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_MESSAGE":
      return { ...state, msg: action.payload };
    // case 'DELETE_CONTACT':
    //   console.log('delete called', action.filteredArray)
    //   state.filteredArray = action.filteredArray
    //   return state
    // case 'GET_CONTACTS':
    //   state.contactArray = action.contactArray
    //   return state
    case "SET_NEW_USER":
      return { ...state, user: action.payload };
    case "SET_PROFILE":
      return { ...state, profile: action.payload };
    case "SET_AVATAR":
      return { ...state, avatar: action.payload };
    default:
      return state;
  }
};

export default reducer;
