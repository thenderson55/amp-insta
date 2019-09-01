import React, { useState, useEffect } from "react";
import { Storage, Auth, API, graphqlOperation } from "aws-amplify";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { PhotoPicker } from "aws-amplify-react";
import { getUser } from "../graphql/queries";
import { updateUser } from "../graphql/mutations";
import awsmobile from "../aws-exports";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { updateMessage, allMessages, setProfileData } from "../store/actions";
import { useSelector, useDispatch } from "react-redux";

import { UserContext } from "../App";

const styles = {
  card: {
    display: "flex",
    marginBottom: 20,
    height: "20%"
  },
  image: {
    minWidth: 100,
    maxWidth: 150,
    objectFit: "cover"
  },
  content: {
    paddingLeft: 30
  }
};

const ProfilePage = ({ id }) => {
  const [image, setImage] = useState();
  const [bio, setBio] = useState();
  const [isUploading, setIsUploading] = useState(false);

  const message = useSelector(state => state.msg);
  const profile = useSelector(state => state.profile);
  const state = useSelector(state => state);

  console.log('p', profile)

  const [open, setOpen] = useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    console.log('bi', bio)
    setOpen(false);
  }

  async function handleUpdate () {
    console.log('bi', bio)
    setOpen(false);
    delete profile.friends;
    delete profile.messages;
    delete profile.comments;
    const input = {
      ...profile,
      bio
    };
    console.log("kk", input);
    const updatedUser = await API.graphql(
      graphqlOperation(updateUser, { input })
    );
    console.log('gg', updatedUser)
    dispatch({ type: "SET_PROFILE", payload: input });

    setOpen(false);

  }


  const dispatch = useDispatch();

  const handleUpdateProfile = (e) => {
    console.log('e', e.target.value)
    setBio(e.target.value)
  }

  const handleAvatarUpload = async user => {
    setIsUploading(true);
    const visibility = "public";
    console.log(user.attributes.sub);
    const { identityId } = await Auth.currentCredentials();
    const filename = `/${visibility}/${identityId}/${Date.now()}-${image.name}`;
    const uploadedFile = await Storage.put(filename, image.file, {
      contentType: image.type
    });
    console.log("file", uploadedFile);
    const file = {
      key: uploadedFile.key,
      bucket: awsmobile.aws_user_files_s3_bucket,
      region: awsmobile.aws_user_files_s3_bucket_region
    };
    dispatch({ type: "SET_AVATAR", payload: uploadedFile.key });
    const currentUserInfo = await API.graphql(
      graphqlOperation(getUser, {
        id: user.attributes.sub
      })
    );
    // AWS didn't add friends, messages, comments to mutations for some reason
    // Possible because they are not scalar types?
    delete currentUserInfo.data.getUser.friends;
    delete currentUserInfo.data.getUser.messages;
    delete currentUserInfo.data.getUser.comments;
    console.log("l", currentUserInfo.data.getUser);
    const input = {
      ...currentUserInfo.data.getUser,
      avatar: file
    };
    console.log("kk", input);
    const updatedUser = await API.graphql(
      graphqlOperation(updateUser, { input })
    );
    console.log("ff", updatedUser.data.updateUser);
    setIsUploading(false);
  };

  const handleUpdateMsg = () => {
    updateMessage("Updated!");
  };

  return (
    <UserContext.Consumer>
      {({ user }) => (
        <>
          <div>{user.username}</div>
          <PhotoPicker
            theme={theme}
            preview
            onPick={file => setImage(file)}
          ></PhotoPicker>
          <Button disabled={!image} onClick={() => handleAvatarUpload(user)}>
            Add avatar
          </Button>
          <p>email: {profile.email}</p>
          <p>username: {profile.username}</p>
          <p>bio: {profile.bio}</p>
          <p>tags: {profile.tags}</p>

          <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Edit
          </Button>

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
            <DialogContent>
              <DialogContentText>
              </DialogContentText>
              <TextField
                // autoFocus
                margin="dense"
                id="bio"
                label="Bio"
                type="text"
                fullWidth
                onChange={handleUpdateProfile}
              />
              <TextField
                // autoFocus
                margin="dense"
                id="tags"
                label="Tags"
                type="email"
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleUpdate} color="primary">
                Update
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </UserContext.Consumer>
  );
};

const theme = {
  formContainer: {
    margin: 0,
    padding: 0
  },
  formSection: {
    margin: 0,
    padding: 0
  },
  sectionBody: {
    height: 100,
    width: 150
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
  }
  // photoPickerButton: {
  //   display: "none"
  // }
};

export default withStyles(styles)(ProfilePage);
