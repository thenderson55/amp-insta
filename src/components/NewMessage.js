import React, { useEffect, useState } from 'react'
import { API, graphqlOperation } from "aws-amplify";
import { createMessage } from "../graphql/mutations";
import { UserContext } from "../App";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';



export default function NewMessage() {
  const [content, setContent] = useState()

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
      console.log(result)
    }catch(err){
      console.log(err)
    }
  }
  return (
    <UserContext.Consumer>
      {({user}) => ( 
        <>
          <TextField
            id="outlined-full-width"
            label="Message"
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
          <Button onClick={() => handleNewMessage(user)}>
            Submit
          </Button>
        </>
      )}
    </UserContext.Consumer>
      
  )
}
