import React, { useEffect, useState } from 'react'
import { API, graphqlOperation } from "aws-amplify";
import { createMessage } from "../graphql/mutations";
import { UserContext } from "../App";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography';


const styles = { 
  card: {
    display: 'flex',
    marginBottom: 20,
    // height: "20%"
  },
  image: {
    minWidth: 100,
    maxWidth: 150,
    objectFit: "cover"
  }, 
  content: {
    paddingLeft: 30,
  },
  input: {
    height: "90%",
    maxWidth: "90%",
    margin: 10,
  }
}


const NewMessage = ({ classes }) =>  {
  const [content, setContent] = useState()
  const [value, setValue] = useState("")

  const handleNewMessage = async (user) => {
    console.log(user.username)
    console.log(user.attributes.sub)
    console.log(user.attributes.email)
    console.log(content)
    try {
      const input  = {
          content,
          messageUserId: user.attributes.sub
      }
      console.log(input)
      const result = API.graphql(graphqlOperation(createMessage, {
        input
      }))
      setContent("")
      console.log(result)
    }catch(err){
      console.log(err)
    }
  }
  return (
    <UserContext.Consumer>
      {({user}) => ( 
        <>
        <Card className={classes.card}>
          {/* <CardMedia image="https://source.unsplash.com/random" title="avatar" className={classes.image}></CardMedia> */}
          {/* <CardContent> */}
            <TextField
              className={classes.input}
              id="outlined-full-width"
              value={content}
              // label="Message"
              style={{ margin: 8 }}
              multiline={true}
              onChange={event => setContent(event.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            {/* <textarea className={classes.input} name="" id="" cols="30" rows="10"></textarea> */}
          {/* </CardContent> */}
            <Button style={{paddingRight: "10px"}} onClick={() => handleNewMessage(user)}>
              Post!
            </Button>
        </Card>
        </>
      )}
    </UserContext.Consumer>
      
  )
}


export default withStyles(styles)(NewMessage)