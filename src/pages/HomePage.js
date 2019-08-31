import React, { useEffect, useState } from 'react'
import Grid from "@material-ui/core/Grid";
import NewMessage from '../components/NewMessage'
import AllMessages from '../components/AllMessages'
import Link from 'react-router-dom/Link'
import Button from '@material-ui/core/Button';
import HomeProfile from "../components/HomeProfile"

export default function HomePage({ user }) {
  return (
    <Grid container spacing={4}>
      <Grid item sm={4} xs={12}>
        {/* <Button component={Link} to={"/profile"}>Profile</Button> */}
        <HomeProfile 
        user={user}
        />
        <Link to={`/gallery/${user.attributes.sub}`}>Gallery</Link>
      </Grid>
      <Grid item sm={8} xs={12}>
        <NewMessage></NewMessage>
        <AllMessages></AllMessages>
      </Grid>
    </Grid>
  )
}
