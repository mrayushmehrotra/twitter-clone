import React from "react";
import TwitterLayout from "@/components/layout/TwitterLayout";
import { fetchTweets } from "@/app/api/tweets/fetchTweets";
import UserProfile from "@/components/UserProfile"; // Client Component

export default async function Page() {
  const tweets = await fetchTweets(); // Fetch tweets on the server

  return (
    <TwitterLayout>
      <UserProfile tweets={tweets} />
    </TwitterLayout>
  );
}
