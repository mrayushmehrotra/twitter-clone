import { Tweet } from "@/gql/graphql";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BiMessageRounded, BiUpload } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";

interface FeedCardProps {
  data: Tweet;
}

const FeedCard: React.FC<FeedCardProps> = ({ data }) => {
  if (!data || !data.author) return null; // Prevent rendering if data is missing
  console.log(data.author.id, "dekho mai aa gayaa");

  return (
    <Link href={`/${data.author.id}`} className="block">
      <div
        className="border border-gray-600 border-b-0 border-r-0 border-l-0 
            p-4 hover:bg-zinc-900 bg-opacity-40 transition-all cursor-pointer"
      >
        <div className="grid grid-cols-12 gap-x-3">
          {/* Profile Image */}
          <div className="col-span-1">
            {data.author.profileImageURL && (
              <Image
                className="rounded-full"
                src={data.author.profileImageURL}
                alt={`${data.author.firstName}'s profile`}
                height={50}
                width={50}
              />
            )}
          </div>

          {/* Tweet Con.idtent */}
          <div className="col-span-11">
            <h5 className="font-bold">
              {data.author.firstName} {data.author.lastName}
            </h5>
            <p className="text-gray-300">{data.content}</p>

            {/* Tweet Image (if exists) */}
            {data.imageURL && (
              <div className="mt-3">
                <Image
                  src={data.imageURL}
                  alt="Tweet Image"
                  width={400}
                  height={400}
                  className="rounded-lg"
                />
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-between mt-5 p-2 text-xl items-center text-gray-400">
              <BiMessageRounded className="cursor-pointer hover:text-blue-400" />
              <FaRetweet className="cursor-pointer hover:text-green-400" />
              <AiOutlineHeart className="cursor-pointer hover:text-red-400" />
              <BiUpload className="cursor-pointer hover:text-gray-200" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FeedCard;
