import React from 'react'
import Grid from "@material-ui/core/Grid";
import NewMessage from '../components/NewMessage'
import AllMessages from '../components/AllMessages'


export default function HomePage() {
  return (
    <Grid container spacing={4}>
      <Grid item sm={4} xs={12}>
        <p>Profile</p>
      </Grid>
      <Grid item sm={8} xs={12}>
        <p>Feed</p>
        <NewMessage></NewMessage>
        <AllMessages></AllMessages>
      </Grid>
    </Grid>
  )
}
