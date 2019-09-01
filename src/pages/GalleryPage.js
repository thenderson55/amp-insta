import React, { useState} from "react";
import { PhotoPicker, S3Image } from "aws-amplify-react";
import { Storage, Auth, API, graphqlOperation } from "aws-amplify";
import awsmobile from "../aws-exports";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from '../graphql/queries'
import { updateUser } from '../graphql/mutations'
import Gallery from '../components/Gallery'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';


const imgTheme = {
  photoImg: {
    margin: 20,
    height: 140,
    width: 140,
    // borderRadius: "50%",
    objectFit: "cover",
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    paddingBottom: 20
  },
  gridList: {
    width: 500,
    height: 450,
  },
}));


export default function GalleryPage({ id }) {

  const [image, setImage] = useState() 
  const [isUploading, setIsUploading] = useState(false)

  const user = useSelector(state => state.user);
  const dispatch = useDispatch()

  const handleAvatarUpload = async () => {
    setIsUploading(true)
    const visibility = "public"
    console.log(user.attributes.sub)
    const { identityId } = await Auth.currentCredentials()
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
    // dispatch ({ type: "SET_AVATAR", payload: uploadedFile.key })
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
    let photos = []
    
    if(currentUserInfo.data.getUser.photos == null){
      photos.push(file)
      
    }else {
      photos = currentUserInfo.data.getUser.photos
      photos.unshift(file)
    }
    // const photos = currentUserInfo.data.getUser.photos
    console.log('pics', photos)
    const input = {
      ...currentUserInfo.data.getUser,
      photos
    }
    console.log('kk', input)
    const updatedUser = await API.graphql(graphqlOperation(updateUser, {input}))
    console.log('ff', updatedUser.data.updateUser)
    setIsUploading(false)

  }

  const onChange = e => {
    const files = Array.from(e.target.files)
    console.log(files)
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
  

  console.log("user gallery:", user);
  return (
    <div>
      <PhotoPicker
        // theme={theme}
        preview
        onPick={file => setImage(file)}
      ></PhotoPicker>
      <Button disabled={!image} onClick={() => handleAvatarUpload(user)}>
        Uplaod Image
      </Button>
        Gallery {id}
      <Gallery id={id} useStyles={useStyles} imgTheme={imgTheme}></Gallery>
      {/* <input type='file' id='single' onChange={onChange} />  */}

    </div>
  );
}
