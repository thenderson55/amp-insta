/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
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
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
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
export const onCreateMessage = `subscription OnCreateMessage {
  onCreateMessage {
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
export const onUpdateMessage = `subscription OnUpdateMessage {
  onUpdateMessage {
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
export const onDeleteMessage = `subscription OnDeleteMessage {
  onDeleteMessage {
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
export const onCreateComment = `subscription OnCreateComment {
  onCreateComment {
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
export const onUpdateComment = `subscription OnUpdateComment {
  onUpdateComment {
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
export const onDeleteComment = `subscription OnDeleteComment {
  onDeleteComment {
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
