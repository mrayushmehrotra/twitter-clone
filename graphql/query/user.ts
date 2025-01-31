import { graphql } from "../../gql";

export const verifyUserGoogleTokenQuery = graphql(`
  #graphql
  query VerifyUserGoogleToken($token: String!) {
    verifyGoogleToken(token: $token)
  }
`);

export const getCurrentUserQuery = graphql(`
  query GetCurrentUser {
    getCurrentUser {
      id
      profileImageURL
      email
      firstName
      lastName
      followers {
        firstName
        lastName
        profileImageURL
      }
      following {
        firstName
        lastName
        profileImageURL
      }

      tweets {
        id
        content
        author {
          firstName
          lastName
          profileImageURL
        }
      }
    }
  }
`);

export const getUserByIdQuery = graphql(`
  #graphql
  query GetUserById($id: ID!) {
    getUserById(id: $id) {
      id
      firstName
      lastName
      profileImageURL
      followers {
        firstName
        lastName
        profileImageURL
      }
      following {
        firstName
        lastName
        profileImageURL
      }
      tweets {
        content
        id
        author {
          firstName
          lastName
          profileImageURL
        }
      }
    }
  }
`);
