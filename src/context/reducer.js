// import{ apartments } from '../data/apartments'
import * as types from "./types"

export const initialState = {
  user: "Tommy",
  hobo: "hobo",
  avatar: "av"
};

export const reducer = (state, action) => {
  switch (action.type) {
    case types.UPDATE_AVATAR:
      return {
        ...state,
        avatar: action.payload
      };
    default:
      return state;
  }
};