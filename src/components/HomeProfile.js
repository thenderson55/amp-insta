import React from 'react'
import { UserContext } from "../App";
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Link from "react-router-dom/Link"
import MuiLink from "@material-ui/core/Link"
import dayjs from 'dayjs'
import LocationOn from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import CalendarToday from '@material-ui/icons/CalendarToday'
import { textAlign } from '@material-ui/system';

const styles = { 
  profile: {
    height: "36.5%",
    display: "flex",
    flexDirection: "column",
    // alignItems: "center"

  },
  card: {
    display: 'flex',
    marginBottom: 20,
    height: "20%"
  },
  imageWrapper: {
    textAlign: "center",

  },
  image: {
    margin: 20,
    height: 120,
    width: 120,
    borderRadius: "50%",
    objectFit: "cover",
    dipaly: "inline-block",
  }, 
  profileDetails: {
    paddingLeft: 20,
  },
  textInfo:{
    display: 'flex',
    alignItems: 'center',
    marginTop: 10,
    '& span' : {
      marginLeft: 10,
    }
  },

}

const HomeProfile = ({ classes }) => {
  return (
    <UserContext.Consumer>
      {({user}) => (
        <Paper className={classes.profile}>
          <div className={classes.imageWrapper} >
            <img className={classes.image} src="https://source.unsplash.com/random" alt="profile avatar"/>
          </div>
          <div style={{textAlign: "center"}}>
            <MuiLink component={Link} to={"/profile"} color="primary" variant="h5">{user.username}</MuiLink>
          </div>
          <div className={classes.profileDetails}>
            {/* {user.tags && <Typography>Bio</Typography> } */}
            <Typography className={classes.textInfo}>
              <LocationOn color="primary"/><span>Tokyo</span>
            </Typography>
            <Typography className={classes.textInfo}>
              
            </Typography>
            <Typography className={classes.textInfo}>
              <CalendarToday color="primary"/>{' '}
              <span>Joined {dayjs(user.createdAt).format('MM YYYY')}</span>
            </Typography>
            <br/>
          </div>
        </Paper>
      )}  
    </UserContext.Consumer>
  )
}

export default withStyles(styles)(HomeProfile)