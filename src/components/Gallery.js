import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { getUser } from "../graphql/queries";
import { onUpdateUser} from "../graphql/subscriptions";
import { Connect } from "aws-amplify-react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { S3Image } from "aws-amplify-react";
import { useSelector, useDispatch } from "react-redux";


export default function Gallery({ id }) {
 
  const onNewMessage = (prevQuery, newData) => {
    let updatedQuery = { ...prevQuery };
    console.log('subs', newData.onUpdateUser)
    console.log('subs', newData.onUpdateUser)
    const updatedPhotoList = [
      newData.onUpdateUser.photos,
      ...prevQuery.getUser.photos
    ];
    updatedQuery.onUpdateUser.photos = updatedPhotoList;
    return updatedQuery;
  };

  // const onNewMessage = (prevQuery, newData) => {
  //   let updatedQuery = { ...prevQuery };
  //   const updatedMessageList = [
  //     newData.onCreateMessage,
  //     ...prevQuery.listMessages.items
  //   ];
  //   updatedQuery.listMessages.items = updatedMessageList;
  //   return updatedQuery;
  // };

  return (
    <Connect
      query={graphqlOperation(getUser, {
        id
      })}
      // subscription={graphqlOperation(onUpdateUser)}
      // onSubscriptionMsg={onNewPhoto}
    >
      {({ data, loading, errors }) => {
        console.log('data', data)
        if (errors.length > 0) return console.log(errors);
        if (loading || !data.getUser)
          return <CircularProgress fullscreen={true} />;
        console.log(data.getUser.photos);
        return (
          <>
            {data.getUser.photos &&
              data.getUser.photos.map(photo => (
                // <div className={classes.imageWrapper}>
                  <S3Image
                    theme={{
                      photoImg: {
                        margin: 20,
                        height: 140,
                        width: 140,
                        borderRadius: "50%",
                        objectFit: "cover",
                      }
                    }}
                    imgKey={photo.key}
                    alt="profile avatar"
                  />
                // </div>
              ))}
          </>
        );
      }}
    </Connect>
  );
}