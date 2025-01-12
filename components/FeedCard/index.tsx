import Image from "next/image";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";

import { BiMessageRounded, BiUpload } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";

const FeedCard: React.FC = () => {
  return (
    <div
      className="border border-gray-600 border-b-0 
            border-r-0 border-l-0  p-4 hover:bg-zinc-900 
            bg-opacity-40  transition-all  "
    >
      <div className="grid grid-cols-12 gap-x-3 ">
        <div className="col-span-1  ">
          <Image
            className="rounded-full"
            src="https://avatars.githubusercontent.com/u/110099419?v=4"
            alt="logo"
            height={60}
            width={60}
          />
        </div>
        <div className="col-span-11">
          <h5>Ayush Mehrotra</h5>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
            consequuntur, architecto iusto sequi eum praesentium vitae pariatur
            blanditiis labore quod impedit delectus aliquam!
          </p>
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
