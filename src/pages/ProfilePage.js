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

import ChipInput from "material-ui-chip-input";

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
  const [tags, setTags] = useState();
  const [isUploading, setIsUploading] = useState(false);

  const message = useSelector(state => state.msg);
  const profile = useSelector(state => state.profile);
  let bioField = useSelector(state => state.profile.bio);
  let tagsField = useSelector(state => state.profile.tags);
  const state = useSelector(state => state);

  // console.log('p', profile)
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [openImg, setOpenImg] = useState(false);

  if(bioField == null){
    bioField = ""
  }
  if(tagsField == null){
    tagsField = ""
  }

  function handleClickOpen() {
    setOpen(true);
  }
  function handleClickOpenImg() {
    setOpenImg(true);
  }

  function handleClose() {
    console.log("bi", bio);
    setOpen(false);
  }
  function handleCloseImg() {
    console.log("bi", bio);
    setOpenImg(false);
  }

  async function handleUpdate() {
    console.log("bi", bio, tags);
    setOpen(false);
    delete profile.friends;
    delete profile.messages;
    delete profile.comments;
    const input = {
      ...profile,
      bio,
      tags
    };
    console.log("kk", input);
    const updatedUser = await API.graphql(
      graphqlOperation(updateUser, { input })
    );
    console.log("gg", updatedUser);
    dispatch({ type: "SET_PROFILE", payload: input });

    setOpen(false);
  }

  const handleUpdateBio = e => {
    console.log("e", e.target.value);
    // if(e.target.value = null){
    //   return
    // }
    setBio(e.target.value);
  };

  const handleUpdateTags = e => {
    console.log("e8", e.target.value);
    const tagsArr = e.target.value.split(",").map(el => {
      return el.trim();
    });

    setTags(tagsArr);
    console.log("tags", tags);
  };

  const handleAvatarUpload = async imgFile => {
    setIsUploading(true);

    // handleFileResize(image)

    const visibility = "public";
    // console.log(user.attributes.sub);
    const { identityId } = await Auth.currentCredentials();
    const filename = `/${visibility}/${identityId}/${Date.now()}`;
    const uploadedFile = await Storage.put(filename, image.file, {
      // ContentEncoding: 'base64',
      contentType: image.type //'image/jpeg'
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
        id
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

  const handleFileResize = event => {
    // updateMessage("Updated!");
    let dataUrl = null;
    const filesToUpload = event.target.files;
    const file = filesToUpload[0];
    // const file = photo.file
    console.log("ff", file);

    const img = document.createElement("img");
    // img.src = window.URL.createObjectURL(file)
    const reader = new FileReader();

    reader.onload = function(e) {
      img.src = e.target.result;

      img.onload = function() {
        let canvas = document.createElement("canvas");
        let ctxOne = canvas.getContext("2d");
        ctxOne.drawImage(img, 0, 0);

        let MAX_WIDTH = 800;
        let MAX_HEIGHT = 600;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        let ctxTwo = canvas.getContext("2d");
        ctxTwo.drawImage(img, 0, 0, width, height);

        dataUrl = canvas.toDataURL("image/jpeg");
        console.log("dtat", dataUrl);
        // convert base64 content to binary data object
        // var buf = new Buffer.from(dataUrl.replace(/^data:image\/\w+;base64,/, ""), 'base64');
        // console.log('buf', buf)

        // handleAvatarUpload(dataUrl)

        // upload file with aws-amplify Storage class
        // Storage.put('image.jpeg', buf, opt);

        // Here you post image to S3
      };
    };
    reader.readAsDataURL(file);
  };

  return (
    <UserContext.Consumer>
      {({ user }) => (
        <>
          <Dialog
            open={openImg}
            onClose={handleCloseImg}
            aria-labelledby="form-dialog-title"
          >
            <PhotoPicker
              // id="file"
              // name="file"
              theme={theme}
              preview
              onPick={file => setImage(file)}
            ></PhotoPicker>
            <Button disabled={!image} onClick={() => handleAvatarUpload(user)}>
              Add avatar
            </Button>
          </Dialog>
          
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClickOpenImg}
          >
            Change Avatar
          </Button>
          <br />
          <br />
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleFileResize}
            multiple
          />
          <label for="file">Choose files</label>
          <p>email: {profile.email}</p>
          <p>username: {profile.username}</p>
          <p>bio: {profile.bio}</p>
          <p>tags: {profile.tags && profile.tags.map(tag => <span>{tag}, </span>)}</p>

          <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Edit
          </Button>

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            {/* <DialogTitle id="form-dialog-title">Subscribe</DialogTitle> */}
            <DialogContent>
              <DialogContentText></DialogContentText>
              <TextField
                // autoFocus
                margin="dense"
                id="bio"
                // value={bio}
                // label=bio
                // value={`${bioField}`}
                defaultValue={`${bioField}`}
                type="text"
                fullWidth
                onChange={handleUpdateBio}
              />
              {/* <ChipInput
                // defaultValue={['foo', 'bar']}
                // fullWidth={true}
                // label={"hello"}
                helperText={"Press return to creat each new tag."}
                placeholder="Tags"
                // value={yourChips}
                // onAdd={(chip) => handleAddChip(chip)}
                // onDelete={(chip, index) => handleDeleteChip(chip, index)}
              /> */}
              <TextField
                margin="dense"
                id="tags"
                defaultValue={`${tagsField}`}
                label="Tags"
                type="email"
                fullWidth
                onChange={handleUpdateTags}
                helperText="Separate tags with commas"
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
  // formContainer: {
  //   margin: 0,
  //   padding: 0,
  //   // height: 100,
  //   // width: 150
  // },
  formSection: {
    margin: 0,
    padding: 0,
    boxShadow: "none"
    // height: 100,
    // width: 150
  },
  // sectionBody: {
  //   height: 100,
  //   width: 150
  //   // minWidth: 200,
  // },
  photoPlaceholder: {
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
    // height: 100,
    // width: 150,
    padding: 0
  },
  sectionHeader: {
    display: "none"
  },
  photoPickerButton: {
    display: "none"
  }
};

export default withStyles(styles)(ProfilePage);
