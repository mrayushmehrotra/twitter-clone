import { Tweet } from "@/gql/graphql";
import Image from "next/image";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";

import { BiMessageRounded, BiUpload } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";

interface FeedCardProps {
  data: Tweet;
}

const FeedCard: React.FC<FeedCardProps> = (props) => {
  const { data } = props;
  return (
    <div
      className="border border-gray-600 border-b-0 
            border-r-0 border-l-0  p-4 hover:bg-zinc-900 
            bg-opacity-40  transition-all  "
    >
      <div className="grid grid-cols-12 gap-x-3 ">
        <div className="col-span-1  ">
          {data.author.profileImageURL && (
            <Image
              className="rounded-full"
              src={data.author.profileImageURL}
              alt="logo"
              height={60}
              width={60}
            />
          )}
        </div>
        <div className="col-span-11">
          <h5>
            {" "}
            {data.author.firstName} {data.author.lastName}{" "}
          </h5>
          <p>{data.content}</p>
          {data.imageURL && (
            <Image src={data.imageURL} alt="image" width={400} height={400} />
          )}
          <div className="flex justify-between mt-5 p-2 text-xl items-center ">
            <div>
              <BiMessageRounded />
            </div>
            <div>
              <FaRetweet />
            </div>
            <div>
              <AiOutlineHeart />
            </div>
            <div>
              <BiUpload />
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FeedCard;
