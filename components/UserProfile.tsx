"use client"; // Mark as Client Component

import React from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import Image from "next/image";
import { useCurrentUser, useGetUserById } from "@/hooks/user";
import FeedCard from "@/components/FeedCard";
import { Tweet } from "@/gql/graphql";

const UserProfile = () => {
  const { user } = useCurrentUser();
  console.log(user);
  if (!user) return null;

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
            src={user.profileImageURL}
            alt={user.firstName}
            className="rounded-full"
            width={100}
            height={100}
          />
        )}
        <h1 className="text-2xl font-bold mt-5">
          {user.firstName} {user.lastName}
        </h1>
        <div className="flex gap-4 mt-2 text-sm text-gray-400">
          <span>{user?.followers?.length ?? 0} followers</span>
          <span>{user?.following?.length ?? 0} following</span>
        </div>
      </div>
      <div>
        {(user.tweets ?? []).map((item) => (
          <FeedCard key={item?.id} data={item as Tweet} />
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
