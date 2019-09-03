/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
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
export const getMessage = `query GetMessage($id: ID!) {
  getMessage(id: $id) {
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
export const listMessages = `query ListMessages(
  $filter: ModelMessageFilterInput
  $limit: Int
  $nextToken: String
) {
  listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const getComment = `query GetComment($id: ID!) {
  getComment(id: $id) {
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
export const listComments = `query ListComments(
  $filter: ModelCommentFilterInput
  $limit: Int
  $nextToken: String
) {
  listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const searchUsers = `query SearchUsers(
  $filter: SearchableUserFilterInput
  $sort: SearchableUserSortInput
  $limit: Int
  $nextToken: String
) {
  searchUsers(
    filter: $filter
    sort: $sort
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
  }
}
`;
