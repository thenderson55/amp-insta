import React, { useState, useEffect } from "react";
import { UserContext } from "../App";
import { S3Image } from "aws-amplify-react";

import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Link from "react-router-dom/Link";
import MuiLink from "@material-ui/core/Link";
import dayjs from "dayjs";
import LocationOn from "@material-ui/icons/LocationOn";
import CalendarToday from "@material-ui/icons/CalendarToday";
import AccountCircle from "@material-ui/icons/AccountCircle";
import CheckBox from "@material-ui/icons/CheckBox";
import Chip from "@material-ui/core/Chip";

import { useSelector, useDispatch } from "react-redux";

// Convert B64 to image
// var image = new Image();
// image.src = 'data:image/png;base64,iVBORw0K...';
// document.body.appendChild(image);


const HomeProfile = ({ classes, match }) => {
  const avatar = useSelector(state => state.avatar);
  const profile = useSelector(state => state.profile);

  return (
    <UserContext.Consumer>
      {({ user }) => (
        <Paper className={classes.profile}>
          <div>
            <div className={classes.imageWrapper}>
              <S3Image
                theme={{
                  photoImg: {
                    margin: 20,
                    height: 140,
                    width: 140,
                    borderRadius: "50%",
                    objectFit: "cover"
                  }
                }}
                imgKey={avatar}
                alt="profile avatar"
              />
            </div>
            <div style={{ textAlign: "center" }}>
              <MuiLink
                component={Link}
                to={`/profile/${user.attributes.sub}`}
                color="primary"
                variant="h5"
              >
                {user.username}
                {user.email}
              </MuiLink>
            </div>
            <div className={classes.profileDetails}>
              {/* {user.tags && <Typography>Bio</Typography> } */}
              <Typography className={classes.textInfo}>
                <AccountCircle color="primary" />
                <span className={classes.spanText}>{profile.bio}</span>
              </Typography>
              <Typography className={classes.textInfo}>
                <CheckBox color="primary" />{" "}
                <span className={classes.spanText}>
                  {profile.tags &&
                    profile.tags.map((tag, i) => (
                      <Chip
                        key={i}
                        style={{ margin: "2px" }}
                        label={`${tag}`}
                        component="a"
                        href="#chip"
                        clickable
                        variant="outlined"
                      />
                    ))}
                </span>
              </Typography>
              <Typography className={classes.textInfo}>
                <CalendarToday color="primary" />{" "}
                <span className={classes.spanText}>
                  Joined {dayjs(user.createdAt).format("MM YYYY")}
                </span>
              </Typography>
              <br />
            </div>
          </div>
        </Paper>
      )}
    </UserContext.Consumer>
  );
};


const styles = {
  profile: {
    display: "flex",
    flexDirection: "column"
  },
  card: {
    display: "flex",
    marginBottom: 20,
    height: "20%"
  },
  imageWrapper: {
    textAlign: "center"
  },
  image: {
    margin: 20,
    height: 140,
    width: 140,
    borderRadius: "50%",
    objectFit: "cover",
    dipaly: "inline-block"
  },
  profileDetails: {
    paddingLeft: 20,
    paddingRight: 15
  },
  textInfo: {
    display: "flex",
    alignItems: "center",
    marginTop: 10
    // "& span": {
    //   marginLeft: 10
    // }
  },
  spanText: {
    marginLeft: 10,
    // overflow:"auto",
    whiteSpace: "normal",
    wordWrap: "break-word"
    // overflowWrap: "break-word"
  }
};

export default withStyles(styles)(HomeProfile);
