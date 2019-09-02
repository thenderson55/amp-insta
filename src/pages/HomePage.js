import React, { useEffect, useState } from 'react'
import Grid from "@material-ui/core/Grid";
import NewMessage from '../components/NewMessage'
import AllMessages from '../components/AllMessages'
import Link from 'react-router-dom/Link'
import Button from '@material-ui/core/Button';
import HomeProfile from "../components/HomeProfile"
import Gallery from '../components/Gallery'
import { makeStyles } from '@material-ui/core/styles';

const imgTheme = {
  photoImg: {
    margin: 5,
    height: 50,
    width: 50,
    // borderRadius: "50%",
    objectFit: "cover",
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    // display: "grid", /* 1 */
    // gridTemplateColumns: "repeat(4, 45px)", /* 2 */
    // // gridTemplateRows: "repeat(auto-fill, 45px)", /* 2 */
    // gridGap: "0.5rem", /* 3 */
    justifyContent: "space-around", /* 4 */
    display: 'flex',
    flexWrap: 'wrap',
    // justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: "2%",

    backgroundColor: theme.palette.background.paper,
    // // // paddingBottom: 20
    // '&::after': {
    //   content: "",
    //   flex: "auto",
    // },
    // '&:hover': {
    //   backgroundColor: '#99f',
  },
  
  gridList: {
    // width: 500,
    // height: 450,
  },
}));

export default function HomePage({ user }) {
  return (
    <>
    <Grid container spacing={4}>
      <Grid item sm={4} xs={12}>
        {/* <Button component={Link} to={"/profile"}>Profile</Button> */}
        <div style={{marginBottom: 20}}>
          <HomeProfile
          user={user}
          />
        </div>

        <Link to={`/gallery/${user.attributes.sub}`}>
          <Gallery id={user.attributes.sub} useStyles={useStyles} imgTheme={imgTheme}></Gallery>
        </Link>
      </Grid>
      <Grid item sm={8} xs={12}>
        <NewMessage></NewMessage>
        <AllMessages></AllMessages>
      </Grid>
    </Grid>
    </>
  )
}

