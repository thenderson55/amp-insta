/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const registerUser = `mutation RegisterUser($input: CreateUserInput!) {
  registerUser(input: $input) {
    id
    username
    email
    registered
    bio
    friends {
      id
      username
      email
      registered
      bio
      friends {
        id
        username
        email
        registered
        bio
        friends {
          id
          username
          email
          registered
          bio
          tags
        }
        messages {
          nextToken
        }
        comments {
          owner
          id
          content
          likes
          createdAt
        }
        tags
        avatar {
          bucket
          region
          key
        }
        photos {
          bucket
          region
          key
        }
      }
      messages {
        items {
          id
          content
          likes
          createdAt
        }
        nextToken
      }
      comments {
        owner
        id
        content
        message {
          id
          content
          likes
          createdAt
        }
        likes
        createdAt
      }
      tags
      avatar {
        bucket
        region
        key
      }
      photos {
        bucket
        region
        key
      }
    }
    messages {
      items {
        id
        user {
          id
          username
          email
          registered
          bio
          tags
        }
        content
        likes
        comments {
          nextToken
        }
        createdAt
      }
      nextToken
    }
    comments {
      owner
      id
      content
      message {
        id
        user {
          id
          username
          email
          registered
          bio
          tags
        }
        content
        likes
        comments {
          nextToken
        }
        createdAt
      }
      likes
      createdAt
    }
    tags
    avatar {
      bucket
      region
      key
    }
    photos {
      bucket
      region
      key
    }
  }
}
`;
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    id
    username
    email
    registered
    bio
    friends {
      id
      username
      email
      registered
      bio
      friends {
        id
        username
        email
        registered
        bio
        friends {
          id
          username
          email
          registered
          bio
          tags
        }
        messages {
          nextToken
        }
        comments {
          owner
          id
          content
          likes
          createdAt
        }
        tags
        avatar {
          bucket
          region
          key
        }
        photos {
          bucket
          region
          key
        }
      }
      messages {
        items {
          id
          content
          likes
          createdAt
        }
        nextToken
      }
      comments {
        owner
        id
        content
        message {
          id
          content
          likes
          createdAt
        }
        likes
        createdAt
      }
      tags
      avatar {
        bucket
        region
        key
      }
      photos {
        bucket
        region
        key
      }
    }
    messages {
      items {
        id
        user {
          id
          username
          email
          registered
          bio
          tags
        }
        content
        likes
        comments {
          nextToken
        }
        createdAt
      }
      nextToken
    }
    comments {
      owner
      id
      content
      message {
        id
        user {
          id
          username
          email
          registered
          bio
          tags
        }
        content
        likes
        comments {
          nextToken
        }
        createdAt
      }
      likes
      createdAt
    }
    tags
    avatar {
      bucket
      region
      key
    }
    photos {
      bucket
      region
      key
    }
  }
}
`;
export const createMessage = `mutation CreateMessage($input: CreateMessageInput!) {
  createMessage(input: $input) {
    id
    user {
      id
      username
      email
      registered
      bio
      friends {
        id
        username
        email
        registered
        bio
        friends {
          id
          username
          email
          registered
          bio
          tags
        }
        messages {
          nextToken
        }
        comments {
          owner
          id
          content
          likes
          createdAt
        }
        tags
        avatar {
          bucket
          region
          key
        }
        photos {
          bucket
          region
          key
        }
      }
      messages {
        items {
          id
          content
          likes
          createdAt
        }
        nextToken
      }
      comments {
        owner
        id
        content
        message {
          id
          content
          likes
          createdAt
        }
        likes
        createdAt
      }
      tags
      avatar {
        bucket
        region
        key
      }
      photos {
        bucket
        region
        key
      }
    }
    content
    likes
    comments {
      items {
        owner
        id
        content
        message {
          id
          content
          likes
          createdAt
        }
        likes
        createdAt
      }
      nextToken
    }
    createdAt
  }
}
`;
export const updateMessage = `mutation UpdateMessage($input: UpdateMessageInput!) {
  updateMessage(input: $input) {
    id
    user {
      id
      username
      email
      registered
      bio
      friends {
        id
        username
        email
        registered
        bio
        friends {
          id
          username
          email
          registered
          bio
          tags
        }
        messages {
          nextToken
        }
        comments {
          owner
          id
          content
          likes
          createdAt
        }
        tags
        avatar {
          bucket
          region
          key
        }
        photos {
          bucket
          region
          key
        }
      }
      messages {
        items {
          id
          content
          likes
          createdAt
        }
        nextToken
      }
      comments {
        owner
        id
        content
        message {
          id
          content
          likes
          createdAt
        }
        likes
        createdAt
      }
      tags
      avatar {
        bucket
        region
        key
      }
      photos {
        bucket
        region
        key
      }
    }
    content
    likes
    comments {
      items {
        owner
        id
        content
        message {
          id
          content
          likes
          createdAt
        }
        likes
        createdAt
      }
      nextToken
    }
    createdAt
  }
}
`;
export const deleteMessage = `mutation DeleteMessage($input: DeleteMessageInput!) {
  deleteMessage(input: $input) {
    id
    user {
      id
      username
      email
      registered
      bio
      friends {
        id
        username
        email
        registered
        bio
        friends {
          id
          username
          email
          registered
          bio
          tags
        }
        messages {
          nextToken
        }
        comments {
          owner
          id
          content
          likes
          createdAt
        }
        tags
        avatar {
          bucket
          region
          key
        }
        photos {
          bucket
          region
          key
        }
      }
      messages {
        items {
          id
          content
          likes
          createdAt
        }
        nextToken
      }
      comments {
        owner
        id
        content
        message {
          id
          content
          likes
          createdAt
        }
        likes
        createdAt
      }
      tags
      avatar {
        bucket
        region
        key
      }
      photos {
        bucket
        region
        key
      }
    }
    content
    likes
    comments {
      items {
        owner
        id
        content
        message {
          id
          content
          likes
          createdAt
        }
        likes
        createdAt
      }
      nextToken
    }
    createdAt
  }
}
`;
export const createComment = `mutation CreateComment($input: CreateCommentInput!) {
  createComment(input: $input) {
    owner
    id
    content
    message {
      id
      user {
        id
        username
        email
        registered
        bio
        friends {
          id
          username
          email
          registered
          bio
          tags
        }
        messages {
          nextToken
        }
        comments {
          owner
          id
          content
          likes
          createdAt
        }
        tags
        avatar {
          bucket
          region
          key
        }
        photos {
          bucket
          region
          key
        }
      }
      content
      likes
      comments {
        items {
          owner
          id
          content
          likes
          createdAt
        }
        nextToken
      }
      createdAt
    }
    likes
    createdAt
  }
}
`;
export const updateComment = `mutation UpdateComment($input: UpdateCommentInput!) {
  updateComment(input: $input) {
    owner
    id
    content
    message {
      id
      user {
        id
        username
        email
        registered
        bio
        friends {
          id
          username
          email
          registered
          bio
          tags
        }
        messages {
          nextToken
        }
        comments {
          owner
          id
          content
          likes
          createdAt
        }
        tags
        avatar {
          bucket
          region
          key
        }
        photos {
          bucket
          region
          key
        }
      }
      content
      likes
      comments {
        items {
          owner
          id
          content
          likes
          createdAt
        }
        nextToken
      }
      createdAt
    }
    likes
    createdAt
  }
}
`;
export const deleteComment = `mutation DeleteComment($input: DeleteCommentInput!) {
  deleteComment(input: $input) {
    owner
    id
    content
    message {
      id
      user {
        id
        username
        email
        registered
        bio
        friends {
          id
          username
          email
          registered
          bio
          tags
        }
        messages {
          nextToken
        }
        comments {
          owner
          id
          content
          likes
          createdAt
        }
        tags
        avatar {
          bucket
          region
          key
        }
        photos {
          bucket
          region
          key
        }
      }
      content
      likes
      comments {
        items {
          owner
          id
          content
          likes
          createdAt
        }
        nextToken
      }
      createdAt
    }
    likes
    createdAt
  }
}
`;
