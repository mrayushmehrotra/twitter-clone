import { graphql } from "@/gql";

export const followUserMutations = graphql(`
  #graphql
  mutation FollowUser($to: ID!) {
    followUser(to: $to)
  }
`);

export const unFollowUserMutations = graphql(`
  #graphql
  mutation UnfollowUser($to: ID!) {
    unfollowUser(to: $to)
  }
`);
