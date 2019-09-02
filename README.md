A simple social media/photo sharing app built with AWS Amplify and React

Currently deployed at:

https://master.dgaju6uqhmz9d.amplifyapp.com/

AppSync/GraphQL schema:

```
type User
  @model(
  queries: { get: "getUser" }
  mutations: { create: "registerUser", update: "updateUser" }
  )
  @searchable {
  id: ID!
  username: String!
  email: String!
  registered: Boolean
  bio: String
  friends: [User]
  messages: [Message] @connection(name: "UserMessages", sortField: "createdAt")
  comments: [Comment]
  tags: [String]
  avatar: S3Object
  photos: [S3Object]
}

type S3Object {
  bucket: String!
  region: String!
  key: String!
}

type Message
  @model
  @auth(
  rules: [
  {
  allow: owner
  identityField: "sub"
  operations: [create, update, delete]
  }
  ]
  ) {
  id: ID
  user: User! @connection(name: "UserMessages", sortField: "createdAt")
  content: String!
  likes: Int
  comments: [Comment]
  @connection(name: "MessageComments", sortField: "createdAt")
  createdAt: String
}

type Comment
  @model
  @auth(
  rules: [
  {
  allow: owner
  identityField: "sub"
  operations: [create, update, delete]
  }
  ]
  ) {
  owner: String!
  id: ID
  content: String!
  message: Message @connection(name: "MessageComments", sortField: "createdAt")
  likes: Int
  createdAt: String
}
```

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.
