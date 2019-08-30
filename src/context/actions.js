import { Storage, Auth, API, graphqlOperation } from 'aws-amplify'
import { getUser } from '../graphql/queries'
import * as types from "./types"


export const getProfile = async (params = {}, dispatch) => {
  const profile  =  await Auth.currentAuthenticatedUser()
  console.log('', profile)
  const currentUserProfile = await API.graphql(
    graphqlOperation(getUser, {
      id: profile.attributes.sub
    })
  )
  console.log('', currentUserProfile.data.getUser.avatar.key)
  dispatch({ type: types.UPDATE_AVATAR, payload: currentUserProfile.data.getUser.avatar.key})

}