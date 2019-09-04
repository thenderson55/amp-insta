import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Link from "react-router-dom/Link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { S3Image } from "aws-amplify-react";

const Message = ({ message, classes }) => {
  dayjs.extend(relativeTime);

  return (
    <Card className={classes.card}>
    <div className={classes.imgWrapper}>
      <S3Image
        theme={{
          photoImg: {
            // margin: 20,
            height: 70,
            width: 70,
            borderRadius: "50%",
            objectFit: "cover"
          }
        }}
        imgKey={message.user.avatar.key}
        alt="profile avatar"
      />
    </div>
      {/* <CardMedia image={message.user.avatar} title="avatar" className={classes.image}></CardMedia> */}
      <CardContent className={classes.content}>
        <Typography variant="body1">{message.content}</Typography>
        <Typography variant="body2" color="textSecondary">
          {dayjs(message.createdAt).fromNow()}
        </Typography>
        <Typography
          variant="h6"
          color="primary"
          component={Link}
          to={`/profile/${message.user.id}`}
        >
          {message.user.username}
        </Typography>
      </CardContent>
    </Card>
  );
};

const styles = {
  card: {
    display: "flex",
    marginBottom: 20,
    height: 100
  },
  imgWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 20
  },
  content: {
    paddingLeft: 20
  }
};

export default withStyles(styles)(Message);
