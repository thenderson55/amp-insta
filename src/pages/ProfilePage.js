import React, { useState, useEffect } from "react";
import { Storage, Auth, API, graphqlOperation } from "aws-amplify";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { PhotoPicker } from "aws-amplify-react";
import { getUser } from "../graphql/queries";
import { updateUser } from "../graphql/mutations";
import awsmobile from "../aws-exports";
import Gallery from "../components/Gallery";
import { makeStyles } from "@material-ui/core/styles";
import Link from "react-router-dom/Link";

import Chip from "@material-ui/core/Chip";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { styled } from '@material-ui/styles';

import { useSelector, useDispatch } from "react-redux";

import { UserContext } from "../App";

const ProfilePage = ({ id, match }) => {
  const [image, setImage] = useState();
  const [bio, setBio] = useState();
  const [tags, setTags] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [visitProfile, setVisitProfile] = useState();
  const [open, setOpen] = useState(false);
  const [openImg, setOpenImg] = useState(false);

  const profile = useSelector(state => state.profile);
  let bioField = useSelector(state => state.profile.bio);
  let tagsField = useSelector(state => state.profile.tags);

  const dispatch = useDispatch();

  if (bioField == null) {
    bioField = "";
  }
  if (tagsField == null) {
    tagsField = "";
  }

  function handleClickOpen() {
    setOpen(true);
  }
  function handleClickOpenImg() {
    setOpenImg(true);
  }

  function handleClose() {
    setOpen(false);
  }
  function handleCloseImg() {
    setOpenImg(false);
  }

  // TODO - fix so don't need to type something to get state
  const handleUpdateBio = e => {
    setBio(e.target.value);
  };

  const handleUpdateTags = e => {
    const tagsArr = e.target.value.split(",").map(el => {
      return el.trim();
    });
    setTags(tagsArr);
  };

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

  useEffect(() => {
    visitedProfileInfo();
  }, []);

  const visitedProfileInfo = async () => {
    const result = await API.graphql(
      graphqlOperation(getUser, {
        id: match.params.id
      })
    );
    setVisitProfile(result.data.getUser);
  };

  const handleAvatarUpload = async () => {
    setIsUploading(true);
    const visibility = "public";
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
          <MyDialog 
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
            >
            </PhotoPicker>
            <MyButton disabled={!image} onClick={handleAvatarUpload}>
              Add avatar
            </MyButton>
          </MyDialog>

          {/* Render change avatar button is id matches current user */}
          {match.params.id == profile.id && (
            <>
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
            </>
          )}

          {visitProfile && (
            <>
              <p>email: {visitProfile.email}</p>
              <p>username: {visitProfile.username}</p>
              <p>
                bio:{" "}
                {visitProfile.id == profile.id ? profile.bio : visitProfile.bio}
              </p>
              <p>
                tags:{" "}
                {visitProfile.id == profile.id
                  ? profile.tags &&
                    profile.tags.map((tag, i) => (
                      <Chip
                        key={i}
                        style={{ margin: "2px" }}
                        label={`${tag}`}
                        component="a"
                        variant="outlined"
                      />
                    ))
                  : visitProfile.tags &&
                    visitProfile.tags.map((tag, i) => (
                      <Chip
                        key={i}
                        style={{ margin: "2px" }}
                        label={`${tag}`}
                        component="a"
                        variant="outlined"
                      />
                    ))}
              </p>
            </>
          )}

          {/* Render edit button is id matches current user */}
          {match.params.id == profile.id && (
            <Button
              variant="outlined"
              color="primary"
              onClick={handleClickOpen}
            >
              Edit
            </Button>
          )}

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

          <br />
          <br />
          <Gallery
            id={match.params.id}
            useStyles={useStyles}
            imgTheme={imgTheme}
          ></Gallery>
          <br />
          {match.params.id == profile.id && (
            <Button
              variant="outlined"
              color="primary"
              component={Link}
              to={`/gallery/${match.params.id}`}
            >
              Gallery
            </Button>
          )}
        </>
      )}
    </UserContext.Consumer>
  );
};

// Styling


const MyDialog = styled(Dialog)({
  border: 0,
  borderRadius: 3,
  boxShadow: 0,
  padding: '0 30px',
});
const MyButton = styled(Button)({
  marginTop: -70,
  marginBottom: 20,
});

const imgTheme = {
  photoImg: {
    margin: 20,
    height: 140,
    width: 140,
    objectFit: "cover"
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    borderRadius: "2%",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: 500,
    height: 450
  }
}));

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

const theme = {
  formContainer: {
    margin: 0,
    padding: 0,
    boxShadow: "none"
  },
  formSection: {
    boxShadow: "none"

  },
  // // sectionBody: {
  // //   height: 100,
  // //   width: 150
  // //   // minWidth: 200,
  // // },
  // photoPlaceholder: {
  //   // display: "flex",
  //   // justifyContent: "center",
  //   // alignItems: "center",
  //   // height: 100,
  //   // width: 150,
  //   padding: 0
  // },
  sectionHeader: {
    display: "none"
  },
  photoPickerButton: {
    display: "none"
  }
};

export default withStyles(styles)(ProfilePage);
