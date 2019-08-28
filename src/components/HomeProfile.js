import React from 'react'
import { UserContext } from "../App";
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Link from "react-router-dom/Link"
import MuiLink from "@material-ui/core/Link"

const styles = { 
  profile: {
    height: "40%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"

  },
  card: {
    display: 'flex',
    marginBottom: 20,
    height: "20%"
  },
  image: {
    marginTop: 20,
    height: 90,
    width: 90,
    borderRadius: "50%",
    objectFit: "cover"
  }, 
}

const HomeProfile = ({ classes }) => {
  return (
    <UserContext.Consumer>
      {({user}) => (
        <Paper className={classes.profile}>
          <div>
            <div >
              <img className={classes.image} src="https://source.unsplash.com/random" alt="profile avatar"/>
            </div>
          </div>
          <hr/>
          <div className="profile-details">
            <MuiLink component={Link} to={"/profile"} color="primary" variant="h5">{user.username}</MuiLink>
          </div>
        </Paper>
      )}  
    </UserContext.Consumer>
  )
}

export default withStyles(styles)(HomeProfile)