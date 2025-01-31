import React from "react";
import TwitterLayout from "@/components/layout/TwitterLayout";

import UserProfile from "@/components/UserProfile"; // Client Component

export default async function Page() {
  return (
    <TwitterLayout>
      <UserProfile />
    </TwitterLayout>
  );
}
