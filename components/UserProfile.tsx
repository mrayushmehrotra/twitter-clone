"use client"; // Mark as Client Component

import React from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import Image from "next/image";
import { useCurrentUser } from "@/hooks/user";
import FeedCard from "@/components/FeedCard";
import { Tweet } from "@/gql/graphql";

interface UserProfileProps {
  tweets: Tweet[];
}

const UserProfile: React.FC<UserProfileProps> = ({ tweets }) => {
  const { user } = useCurrentUser();

  return (
    <div>
      <nav className="flex items-center gap-3 py-2">
        <BsArrowLeftShort className="text-4xl" />
        <div>
          <h1 className="text-2xl font-bold">
            {user?.firstName} {user?.lastName}
          </h1>
          <h1 className="text-md font-bold text-zinc-500">100 tweets</h1>
        </div>
      </nav>
      <div className="p-4 border-b border-slate-800">
        {user?.profileImageURL && (
          <Image
            src={user?.profileImageURL}
            alt={user?.firstName}
            className="rounded-full"
            width={100}
            height={100}
          />
        )}
        <h1 className="text-2xl font-bold mt-5">
          {user?.firstName} {user?.lastName}
        </h1>
      </div>
      <div>
        {tweets?.map((tweet) => (
          <FeedCard key={tweet?.id} data={tweet as Tweet} />
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
