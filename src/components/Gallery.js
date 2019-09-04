import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { getUser } from "../graphql/queries";
import { updateUser } from "../graphql/mutations";
import { onUpdateUser} from "../graphql/subscriptions";
import { Connect } from "aws-amplify-react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { S3Image } from "aws-amplify-react";
// import { useSelector, useDispatch } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import DeleteOutline from "@material-ui/icons/DeleteOutline";

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

export default function Gallery({ id, useStyles, imgTheme, remove }) {
  const classes = useStyles();

  const onNewPhoto = (prevQuery, newData) => {
    let updatedQuery = { ...prevQuery };
    if( newData.onUpdateUser.photos.length > prevQuery.getUser.photos.length){
      const updatedPhotoList = [
        newData.onUpdateUser.photos[0],
        ...prevQuery.getUser.photos
      ];
      updatedQuery.getUser.photos = updatedPhotoList;
    } else {
      updatedQuery.getUser.photos = newData.onUpdateUser.photos
    }
    return updatedQuery;
  };


  const handleImageRemove = async (imgKey) => {
    // console.log(user.attributes.sub)
    // const { identityId } = await Auth.currentCredentials()
    // const filename = `/${visibility}/${identityId}/${Date.now()}-${image.name}`
    // const uploadedFile = await Storage.put(filename, image.file, {
    //   contentType: image.type
    // })
    // console.log('file', uploadedFile)
    // const file = {
    //   key: uploadedFile.key,
    //   bucket: awsmobile.aws_user_files_s3_bucket,
    //   region: awsmobile.aws_user_files_s3_bucket_region
    // }
    // dispatch ({ type: "SET_AVATAR", payload: uploadedFile.key })
    const currentUserInfo = await API.graphql(
      graphqlOperation(getUser, {
        id
      })
    );
    // AWS didn't add friends, messages, comments to mutations for some reason
    // Possible because they are not scalar types?
    delete currentUserInfo.data.getUser.friends
    delete currentUserInfo.data.getUser.messages
    delete currentUserInfo.data.getUser.comments
    const updatedPhotos = currentUserInfo.data.getUser.photos.filter(photo => {
      return photo.key != imgKey
    })
    const input = {
      ...currentUserInfo.data.getUser,
      photos: updatedPhotos
    }
    const updatedUser = await API.graphql(graphqlOperation(updateUser, {input}))
  }


  return (
    <Connect
      query={graphqlOperation(getUser, {
        id
      })}
      subscription={graphqlOperation(onUpdateUser)}
      onSubscriptionMsg={onNewPhoto}
      // onSubscriptionMsg={onDeletePhoto}
    >
      {({ data, loading, errors }) => {
        if (errors.length > 0) return console.log(errors);
        if (loading || !data.getUser) return <div></div>
          // return <CircularProgress fullscreen={true} />;
        return (
          <>
          <div style={{textAlign: "center"}}>
          <div className={classes.root}>
          {/* <Carousel> */}

            {data.getUser.photos &&
              data.getUser.photos.map(photo => (
                // <div className={classes.imageWrapper}>
                // <GridListTile key={photo.key} >
                  // {/* <img src={tile.img} alt={tile.title} /> */}
                  <>
                    <div key={photo.key} className="image-wrapper">
                      <S3Image
                        theme={imgTheme}
                        imgKey={photo.key}
                        alt="profile gallery"
                      >
                      </S3Image>
                      {remove && (

                      <DeleteOutline className="delete-icon" onClick={() => {handleImageRemove(photo.key)} }/>
                      )}
                    </div>
                    {/* <button onClick={() => {handleImageRemove(photo.key)} }>Delete</button> */}
                  </>
                // {/* </GridListTile>  */}
              ))}
            {/* </GridList> */}
          {/* </Carousel> */}
            {/* <GridList   cols={4}> */}
          </div>
          </div>
          </>
        );
      }}
    </Connect>
  );
}
