"use client"; // Mark as Client Component

import React, { useCallback } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import Image from "next/image";
import { useCurrentUser, useGetUserById } from "@/hooks/user";
import FeedCard from "@/components/FeedCard";
import { Tweet } from "@/gql/graphql";
import { usePathname } from "next/navigation";
import { graphQLClient } from "@/app/clients/api";
import {
  followUserMutations,
  unFollowUserMutations,
} from "@/graphql/mutation/user";
import { useQueryClient } from "@tanstack/react-query";

const UserProfile = () => {
  const path = usePathname();
  const currentUserPathURL = path.split("/").filter(Boolean).pop() ?? "";
  const queryClient = useQueryClient();

  const handleFollowUser = useCallback(async () => {
    if (!currentUserPathURL) return;
    await graphQLClient.request(followUserMutations, {
      to: currentUserPathURL,
    });
    await queryClient.invalidateQueries({ queryKey: ["current-user"] });
  }, [currentUserPathURL, queryClient]);

  const handleUnfollowUser = useCallback(async () => {
    if (!currentUserPathURL) return;
    await graphQLClient.request(unFollowUserMutations, {
      to: currentUserPathURL,
    });
    await queryClient.invalidateQueries({ queryKey: ["current-user"] });
  }, [currentUserPathURL, queryClient]);

  // get the user by the pathname
  const { data, isLoading, error } = useGetUserById(currentUserPathURL);
  //get the current User which is logged in
  const { user } = useCurrentUser();
  if (!currentUserPathURL) return null;
  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-10 h-10 border-4 border-t-transparent border-gray-300 rounded-full animate-spin motion-safe:animate-[spin_0.3s_linear_infinite]"></div>
      </div>
    );
  if (error || !data) return <p>Error fetching user data</p>;

  return (
    <div>
      <nav className="flex items-center gap-3 py-2">
        <BsArrowLeftShort className="text-4xl cursor-pointer" />
        <div>
          <h1 className="text-2xl font-bold">
            {data.getUserById?.firstName} {data.getUserById?.lastName}
          </h1>
          <h1 className="text-md font-bold text-zinc-500">
            {data.getUserById?.tweets?.length ?? 0} tweets
          </h1>
        </div>
      </nav>

      <div className="p-4 border-b border-slate-800">
        {data.getUserById?.profileImageURL && (
          <Image
            src={data.getUserById?.profileImageURL}
            alt={data.getUserById?.firstName}
            className="rounded-full"
            width={100}
            height={100}
          />
        )}
        <h1 className="text-2xl font-bold mt-5">
          {data.getUserById?.firstName} {data.getUserById?.lastName}
        </h1>
        <div className="flex justify-between">
          <div className="flex gap-4 mt-2 text-sm text-gray-400">
            <span>{data.getUserById?.followers?.length ?? 0} followers</span>
            <span>{data.getUserById?.following?.length ?? 0} following</span>
          </div>

          {data.getUserById?.id !== user?.id &&
            (data.getUserById?.followers?.some(
              (searchedUser) => searchedUser?.id === user?.id,
            ) ? (
              <button
                onClick={handleUnfollowUser}
                className="bg-gray-300 text-sm font-semibold text-black px-4 py-2 rounded-full"
              >
                Unfollow
              </button>
            ) : (
              <button
                onClick={handleFollowUser}
                className="bg-white text-sm font-semibold text-black px-4 py-2 rounded-full"
              >
                Follow
              </button>
            ))}
        </div>
      </div>

      <div>
        {data.getUserById?.tweets?.map((item) =>
          item ? <FeedCard key={item.id} data={item as Tweet} /> : null,
        )}
      </div>
    </div>
  );
};

export default UserProfile;
