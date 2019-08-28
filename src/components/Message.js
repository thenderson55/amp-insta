import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from 'react-router-dom/Link'

const styles ={ 
  card: {
    display: 'flex',
  }
}

const Message = ({ message, classes, user }) => {
  return (
    <Card style={{margin: "20px"}}>
      <CardContent>
        <Typography variant="body1">{message.content}</Typography>
        <Typography variant="body2" color="textSecondary" >{message.createdAt}</Typography>
        <Typography variant="h6" component={Link} to={`/profile/${message.user.id}`}>{message.user.username}</Typography>
      </CardContent>
    </Card>
  )
}

export default withStyles(styles)(Message)
