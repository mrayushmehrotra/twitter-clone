import { getAllTweetsQuery } from "@/graphql/query/tweet";
import { Tweet } from "@/gql/graphql";
import { graphQLClient } from "@/app/clients/api";

export async function fetchTweets(): Promise<Tweet[]> {
  try {
    const allTweets = await graphQLClient.request(getAllTweetsQuery);
    return allTweets.getAllTweets as Tweet[];
  } catch (error) {
    console.error("Error fetching tweets:", error);
    return [];
  }
}
