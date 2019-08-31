
const initialState = {
  user: "",
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
      console.log("reduce user:", action.payload);
      return { ...state, user: action.payload };
    case "SET_AVATAR":
      console.log("reduce avatar:", action.payload);
      return { ...state, avatar: action.payload };
    // case SET_AVATAR:
    //   console.log("reduce avatar:", action.payload);
    //   return {
    //     ...state,
    //     profile: { ...state.profile, avatar: {...state.profile.avatar, key:action.payload} }
    //   };
    default:
      return state;
  }
};

export default reducer;
