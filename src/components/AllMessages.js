import React from "react";
import { graphqlOperation } from "aws-amplify";
import { listMessages } from "../graphql/queries";
import { onCreateMessage} from "../graphql/subscriptions";
import { Connect } from "aws-amplify-react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Message from "./Message";

export default function AllMessages() {
  const onNewMessage = (prevQuery, newData) => {
    let updatedQuery = { ...prevQuery };
    const updatedMessageList = [
      newData.onCreateMessage,
      ...prevQuery.listMessages.items
    ];
    updatedQuery.listMessages.items = updatedMessageList;
    return updatedQuery;
  };

  return (
    
    <Connect
      query={graphqlOperation(listMessages)}
      subscription={graphqlOperation(onCreateMessage)}
      onSubscriptionMsg={onNewMessage}
    >
      {({ data, loading, errors }) => {
        if (errors.length > 0) return console.log(errors);
        if (loading || !data.listMessages)
          return <div></div>
          // return <CircularProgress fullscreen={true} />;
        // console.log(data.listMessages.items)
        // Change to Unix, sort then change back to UTC
        const changeToUnix = data.listMessages.items.map(message => {
          const newTime = Math.round(new Date(message.createdAt).getTime()/1000)
          return {...message, createdAt: newTime}
        })
        changeToUnix.sort((a, b) => (b.createdAt > a.createdAt) ? 1 : -1)
        const sortedByTime = changeToUnix.map(message => {
          const newTime = new Date(message.createdAt * 1000)
          return {...message, createdAt: newTime}
        })


        return (
          <>
            {sortedByTime &&
              sortedByTime.map(message => (

                <Message message={message} key={message.id} />
              ))}
          </>
        );
      }}
    </Connect>
  );
}

