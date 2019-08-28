import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { listMessages } from "../graphql/queries";
import { Connect } from "aws-amplify-react";
import CircularProgress from '@material-ui/core/CircularProgress';
import Message from './Message'


export default function AllMessages() {

  // useEffect(() => {
  //   getMessages()
  // }, [])

  // const getMessages = async () => {
  //   try {
  //     const result = await API.graphql(graphqlOperation(listMessages))
  //     console.log(result)
  //   }catch (err){
  //     console.log(err)
  //   }
  // }


  return (
    <Connect 
      query={graphqlOperation(listMessages)}
      // subscription={graphqlOperation(onCreateMarket)}
      // onSubscriptionMsg={onNewMarket}
    >
     {({ data, loading, errors }) => {
        if (errors.length > 0) return console.log(errors)
        if (loading || !data.listMessages) return <CircularProgress fullscreen={true} />;
        console.log(data.listMessages.items)
        return (
          <>
            {data.listMessages.items && data.listMessages.items.map(message => (
              <Message message={message} key={message.id}/>
            ))}
          </>
        );
      }}
    </Connect>
  );
              // <div> {
              // listEvents ? (
              //     <ListView events={listEvents.items}/>
              //     ) : (
              //     <h3> Loading </h3>
              // )} </div>
}


// const markets =  data.listMessages.items
