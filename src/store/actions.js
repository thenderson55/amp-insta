// import { UPDATE_MESSAGE, ALL_MESSAGES, SET_NEW_USER, SET_PROFILE_DATA, SET_AVATAR} from './constants'
// import { API, graphqlOperation } from "aws-amplify";
// import { Auth } from "aws-amplify";

// import { listMessages, getUser } from "../graphql/queries";



// export const updateMessage = (payload) => {
//   return { type: UPDATE_MESSAGE, payload }
// }

// // export const setNewUser = (payload) => {
// //   return { type: SET_NEW_USER, payload }
// // }

// export const setProfileData = (payload) => {
//   console.log('new pro pic')
//   return { type: SET_PROFILE_DATA, payload }
// }

// // export const setAvatar = (payload) => {
// //   return { type: SET_AVATAR, payload }
// // }

// export const allMessages = (paylaod) => {
//   return async function(dispatch) {
//     try{
//       const result = await API.graphql(graphqlOperation(listMessages))
//       console.log('action message', result.data)
//     }catch(err){
//       console.log('er', err)
//     }
//   }
// }

// export const setUserInfo = () => {
//   return async function(dispatch) {
//     const user = await Auth.currentAuthenticatedUser();
//     console.log(user);
//     dispatch({ type: SET_NEW_USER, payload: user })
//     // user ? setUser(user) : setUser(null);
//     // setNewUser(user)
//     const currentUserProfile = await API.graphql(
//       graphqlOperation(getUser, {
//         id: user.attributes.sub
//       })
//       )
//     const profile = currentUserProfile.data.getUser
//     console.log('actio ::', profile)
//       //   user ? setUser(user) : setUser(null);
//     let key = ""
//     if(profile.avatar == null){
//       key = profile.avatar
//     }else {
//       key = profile.avatar.key
//     }
//     console.log(key)
//     dispatch({ type: "SET_AVATAR", payload:key })
//   }
// };