import React, { useState } from "react";
import { PhotoPicker} from "aws-amplify-react";
import { Storage, Auth, API, graphqlOperation } from "aws-amplify";
import awsmobile from "../aws-exports";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../graphql/queries";
import { updateUser } from "../graphql/mutations";
import Gallery from "../components/Gallery";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import { styled } from "@material-ui/styles";

export default function GalleryPage({ id }) {
  const [image, setImage] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [openImg, setOpenImg] = useState(false);

  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  function handleClickOpenImg() {
    setOpenImg(true);
  }

  function handleCloseImg() {
    setOpenImg(false);
  }

  const handleImageUpload = async () => {
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
    // dispatch ({ type: "SET_AVATAR", payload: uploadedFile.key })
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
    let photos = [];

    if (currentUserInfo.data.getUser.photos == null) {
      photos.push(file);
    } else {
      photos = currentUserInfo.data.getUser.photos;
      photos.unshift(file);
    }
    // const photos = currentUserInfo.data.getUser.photos
    console.log("pics", photos);
    const input = {
      ...currentUserInfo.data.getUser,
      photos
    };
    console.log("kk", input);
    const updatedUser = await API.graphql(
      graphqlOperation(updateUser, { input })
    );
    console.log("ff", updatedUser.data.updateUser);
    setIsUploading(false);
  };

  const onChange = e => {
    const files = Array.from(e.target.files);
    console.log(files);
    // var reader = new FileReader();

    // reader.onload = function(e) {
    //     reader.readAsDataURL(file);
    // }

    // const fileName = e.target.files[0].name;
    // const reader = new FileReader();
    // reader.readAsDataURL(e.target.files[0]);
    // reader.onload = event => {
    //     const img = new Image();
    //     img.src = event.target.result;
    //     img.onload = () => {
    //             // console.log(img)
    //             const elem = document.createElement('canvas');
    //             elem.width = width;
    //             elem.height = height;
    //             const ctx = elem.getContext('2d');
    //             // img.width and img.height will contain the original dimensions
    //             ctx.drawImage(img, 0, 0, width, height);
    //             ctx.canvas.toBlob((blob) => {
    //                 const file = new File([blob], fileName, {
    //                     type: 'image/jpeg',
    //                     lastModified: Date.now()
    //                 });
    //             }, 'image/jpeg', 1);
    //         },
    //         reader.onerror = error => console.log(error);
  };

  // this.setState({ uploading: true })

  // const formData = new FormData()

  // files.forEach((file, i) => {
  //   formData.append(i, file)
  // })

  // fetch(`${API_URL}/image-upload`, {
  //   method: 'POST',
  //   body: formData
  // })
  // .then(res => res.json())
  // .then(images => {
  //   this.setState({
  //     uploading: false,
  //     images
  //   })
  // })
  const remove = true;

  console.log("user gallery:", user);
  return (
    <div>
      <MyDialog
        open={openImg}
        onClose={handleCloseImg}
        aria-labelledby="form-dialog-title"
      >
        <PhotoPicker
          theme={theme}
          preview
          onPick={file => setImage(file)}
        ></PhotoPicker>
        <MyButton disabled={!image} onClick={() => handleImageUpload(user)}>
          Uplaod Image
        </MyButton>
      </MyDialog>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleClickOpenImg}
        style={{ marginBottom: 30, marginTop: 20 }}
      >
        Add Photo
      </Button>
      <Gallery
        id={id}
        remove={remove}
        useStyles={useStyles}
        imgTheme={imgTheme}
      ></Gallery>
    </div>
  );
}

// STYLING

const imgTheme = {
  photoImg: {
    margin: 20,
    height: 140,
    width: 140,
    // borderRadius: "50%",
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
    paddingBottom: 20,
    backgroundColor: theme.palette.background.paper
    // paddingBottom: 20
  },
  gridList: {
    width: 500,
    height: 450
  }
}));

const MyDialog = styled(Dialog)({
  border: 0,
  borderRadius: 3,
  boxShadow: 0,
  padding: "0 30px"
});
const MyButton = styled(Button)({
  marginTop: -70,
  marginBottom: 20
});

const theme = {
  formContainer: {
    margin: 0,
    padding: 0,
    boxShadow: "none"
  },
  formSection: {
    boxShadow: "none"
  },

  sectionHeader: {
    display: "none"
  },
  photoPickerButton: {
    display: "none"
  }
};
