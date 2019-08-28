import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button';
// import { UserContext } from "../App";

const styles = { 
  card: {
    display: 'flex',
    marginBottom: 20,
    height: "20%"
  },
  image: {
    minWidth: 100,
    maxWidth: 150,
    objectFit: "cover"
  }, 
  content: {
    paddingLeft: 30,
  }
}


const Profile = ({ user, classes }) => {
  return (
    // <UserContext.Consumer>
    //   {({ user }) => (
    //     <div>{user.username}</div>
    //   )}

    // </UserContext.Consumer>
    <div>{user.username}</div>
  )
}

export default withStyles(styles)(Profile)