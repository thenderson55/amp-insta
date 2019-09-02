import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from 'react-router-dom/Link'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'


const styles = { 
  card: {
    display: 'flex',
    marginBottom: 20,
    height: "12%"
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

const Message = ({ message, classes }) => {
  dayjs.extend(relativeTime)
  return (
    <Card className={classes.card}>
      <CardMedia image="http://lorempixel.com/400/300/" title="avatar" className={classes.image}></CardMedia>
      <CardContent className={classes.content}>
        <Typography variant="body1">{message.content}</Typography>
        <Typography variant="body2" color="textSecondary" >{dayjs(message.createdAt).fromNow()}</Typography>
        <Typography variant="h6" color="primary" component={Link} to={`/profile/${message.user.id}`}>{message.user.username}</Typography>
      </CardContent>
    </Card>
  )
}

export default withStyles(styles)(Message)
