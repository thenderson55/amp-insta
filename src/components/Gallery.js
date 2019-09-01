import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { getUser } from "../graphql/queries";
import { onUpdateUser} from "../graphql/subscriptions";
import { Connect } from "aws-amplify-react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { S3Image } from "aws-amplify-react";
// import { useSelector, useDispatch } from "react-redux";

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

export default function Gallery({ id, useStyles, imgTheme }) {
  const classes = useStyles();

  const onNewPhoto = (prevQuery, newData) => {
    let updatedQuery = { ...prevQuery };
    const updatedPhotoList = [
      newData.onUpdateUser.photos[0],
      ...prevQuery.getUser.photos
    ];
    updatedQuery.getUser.photos = updatedPhotoList;
    return updatedQuery;
  };


  return (
    <Connect
      query={graphqlOperation(getUser, {
        id
      })}
      subscription={graphqlOperation(onUpdateUser)}
      onSubscriptionMsg={onNewPhoto}
    >
      {({ data, loading, errors }) => {
        if (errors.length > 0) return console.log(errors);
        if (loading || !data.getUser)
          return <CircularProgress fullscreen={true} />;
        return (
          <>
          <div className={classes.root}>
            <GridList   cols={4}>
            {data.getUser.photos &&
              data.getUser.photos.map(photo => (
                // <div className={classes.imageWrapper}>
                // <GridListTile key={photo.key} >
                  // {/* <img src={tile.img} alt={tile.title} /> */}
                  <>
                    <S3Image
                      theme={imgTheme}
                      imgKey={photo.key}
                      alt="profile gallery"
                    ></S3Image>
                  </>
                // {/* </GridListTile>  */}
              ))}
            </GridList>
          </div>
          </>
        );
      }}
    </Connect>
  );
}