"use client";
import React, { useCallback, useState } from "react";
import { useCurrentUser } from "@/hooks/user";
import { useCreateTweet, useGetAllTweets } from "@/hooks/tweet";
import TwitterLayout from "@/components/layout/TwitterLayout";
import Image from "next/image";
import { BiImageAlt } from "react-icons/bi";
import FeedCard from "@/components/FeedCard";
import { Tweet } from "@/gql/graphql";
import { graphQLClient } from "./clients/api";
import { getSignedURLForTweetQuery } from "@/graphql/query/tweet";
import axios from "axios";
import toast from "react-hot-toast";

interface HomeProps {
  tweets?: Tweet[];
}

export default function Home() {
  const { user } = useCurrentUser();
  const { tweets = [] } = useGetAllTweets();
  //  TODO: FIx this typescript error in future
  // @ts-expect-error
  const { mutateAsync } = useCreateTweet();
  const [content, setContent] = useState("");
  const [imageURL, setImageURL] = useState("");

  const handleInputChangeFile = useCallback((input: HTMLInputElement) => {
    return async (event: Event) => {
      try {
        event.preventDefault();
        const file: File | null | undefined = input.files?.item(0);
        if (!file) return;
        const { getSignedURLForTweet } = await graphQLClient.request(
          getSignedURLForTweetQuery,
          {
            imageName: file.name,
            imageType: file.type,
          },
        );
        if (getSignedURLForTweet) {
          toast.loading("uploading", { id: "2" });
          await axios.put(getSignedURLForTweet, file, {
            headers: {
              "Content-Type": file.type,
            },
          });
          toast.success("upload completed", { id: "2" });
          const url = new URL(getSignedURLForTweet);
          const myFilePath = `${url.origin}${url.pathname}`;
          setImageURL(myFilePath);
        }
      } catch (err) {
        toast.error("aws error", { id: "2" });
      }
    };
  }, []);

  const handleSelectImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    const handleFn = handleInputChangeFile(input);
    input.addEventListener("change", handleFn);
  }, [handleInputChangeFile]);
  const handleCreateTweet = useCallback(() => {
    try {
      mutateAsync({
        content,
        imageURL,
      });
      setContent("");
    } catch (err) {
      console.log(err);
      toast.error("something went wrong");
    }
  }, [content, mutateAsync, imageURL]);

  return (
    <div>
      <TwitterLayout>
        <div>
          <div
            className="border border-gray-600 border-b-0 
            border-r-0 border-l-0  p-4 hover:bg-zinc-900 
            bg-opacity-40  transition-all  "
          >
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-1">
                {user?.profileImageURL && (
                  <Image
                    className="rounded-full"
                    src={user?.profileImageURL}
                    alt="user-image"
                    height={50}
                    width={50}
                  />
                )}
              </div>
              <div className="col-span-11">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="What's happening?"
                  className="w-full bg-transparent text-xl px-3 border-b border-slate-700  "
                  rows={3}
                />
                {imageURL && (
                  <Image
                    src={imageURL}
                    alt="tweet-img"
                    width={300}
                    height={300}
                  />
                )}
                <div className="mt-2 flex justify-between items-center  ">
                  <BiImageAlt
                    onClick={handleSelectImage}
                    className="text-xl cursor-pointer  "
                  />
                  <button
                    onClick={handleCreateTweet}
                    className="bg-[#1d9bf0] font-semibold text-lg  px-4 py-2  mt-5 rounded-full  mx-4   "
                  >
                    Tweet
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {tweets?.map((tweet) =>
          tweet ? <FeedCard key={tweet?.id} data={tweet as Tweet} /> : null,
        )}
      </TwitterLayout>
    </div>
  );
}
