import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from "react-router-dom/Link";

export default function Navbar({ user, handleSignOut }) {

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Grid
          justify="space-between" // Add it here :)
          container
        >
          <Grid item>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to={`/gallery/${user.attributes.sub}`}>
              Gallery
            </Button>
            {/* <span style={{fontSize: "0.9em", margin: 20}} color="inherit" disabled>Logged in as: {user.username}</span> */}
          </Grid>
          <Grid item>
          </Grid>
          <Grid item style={{display: "flex"}}>
            <Button color="inherit" onClick={handleSignOut}>
              Log Out
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
