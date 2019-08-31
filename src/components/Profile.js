import React, { useState, useEffect } from 'react'
import { Storage, Auth, API, graphqlOperation } from 'aws-amplify'
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button';
import { PhotoPicker } from 'aws-amplify-react'
import { getUser } from '../graphql/queries'
import { updateUser } from '../graphql/mutations'
import awsmobile from '../aws-exports'
import { useStateValue } from '../context/store'
import { connect } from 'react-redux'
import { updateMessage } from '../store/actions'

import { UserContext } from "../App";

const styles = { 
  card: {
    display: 'flex',
    marginBottom: 20,
    height: "20%"
  },
  image: {
    minWidth: 100,
    maxWidth: 150,
    objectFit: "cover"
  }, 
  content: {
    paddingLeft: 30,
  }
}


const Profile = ({ id, message, updateMessage }) => {
  const [image, setImage] = useState()
  const [isUploading, setIsUploading] = useState(false)
  const [{ avatar }, dispatch] = useStateValue()
  console.log("msg", message)

  const handleAvatarUpload = async (user) => {
    setIsUploading(true)
    const visibility = "public"
    console.log(user.attributes.sub)
    const { identityId } = await Auth.currentCredentials()
    // console.log('a', a)
    const filename = `/${visibility}/${identityId}/${Date.now()}-${image.name}`
    const uploadedFile = await Storage.put(filename, image.file, {
      contentType: image.type
    })
    console.log('file', uploadedFile)
    const file = {
      key: uploadedFile.key,
      bucket: awsmobile.aws_user_files_s3_bucket,
      region: awsmobile.aws_user_files_s3_bucket_region
    }
    // dispatch({
    //   type:  "UPDATE_AVATAR",
    //   payload: file
    // })
    console.log('id', identityId)
    const currentUserInfo = await API.graphql(
      graphqlOperation(getUser, {
        id: user.attributes.sub
      })
    );
    // AWS didn't add friends, messages, comments to mutations for some reason
    // Possible because they are not scalar types?
    delete currentUserInfo.data.getUser.friends
    delete currentUserInfo.data.getUser.messages
    delete currentUserInfo.data.getUser.comments
    console.log('l', currentUserInfo.data.getUser)
    const input = {
      ...currentUserInfo.data.getUser,
      avatar: file
    }
    console.log('kk', input)
    const updatedUser = await API.graphql(graphqlOperation(updateUser, {input}))
    console.log('ff', updatedUser.data.updateUser)
  }

  const handleUpdateMsg = () => {
    updateMessage("Updated!")
  }

  return (
    <UserContext.Consumer>
      {({ user }) => (
        <>
        <div>{user.username}</div>
        <PhotoPicker theme={theme}
        preview
        onPick={file => setImage(file)}
        ></PhotoPicker>
        <Button disabled={!image} onClick={() => handleAvatarUpload(user)}>Add avatar</Button>
        <div>{id}</div>
        <div>{user.attributes.sub}</div>
        <button onClick={handleUpdateMsg}></button>
      </>
      )}

    </UserContext.Consumer>
  )
}

const theme = {
  formContainer: {
    margin: 0,
    padding: 0,
  },
  formSection: {
    margin: 0,
    padding: 0,
  },
  sectionBody: {
    height: 100,
    width: 150,
    // minWidth: 200,
  },
  photoPlaceholder: {
    boxShadow: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    // width: 150,
    padding: 0

  },
  sectionHeader: {
    color: "pink"
  },
  // photoPickerButton: {
  //   display: "none"
  // }
}

const mapStateToProps = state => {
  return {
    message: state.msg
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateMessage: message => dispatch(updateMessage(message))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Profile))