"use client";
import { BsTwitter, BsBell, BsEnvelope, BsBookmark } from "react-icons/bs";
import React from "react";
import { BiHash, BiHomeCircle, BiMoney, BiUser } from "react-icons/bi";
import { SlOptions } from "react-icons/sl";
import FeedCard from "@/components/FeedCard";
import { LoginComponent } from "@/components/ClientSideHelperFn";
import { useCurrentUser } from "@/hooks/user";
import Image from "next/image";

interface TwitterSidebarButton {
  title: string;
  icon: React.ReactNode;
}
const SidebarMenuItem: TwitterSidebarButton[] = [
  {
    title: "Home",
    icon: <BiHomeCircle />,
  },
  {
    title: "Explore",
    icon: <BiHash />,
  },
  {
    title: "Notifications",
    icon: <BsBell />,
  },
  {
    title: "Messages",
    icon: <BsEnvelope />,
  },
  {
    title: "Bookmark",
    icon: <BsBookmark />,
  },
  {
    title: "Twitter Blue",
    icon: <BiMoney />,
  },
  {
    title: "Profile",
    icon: <BiUser />,
  },
  {
    title: "More",
    icon: <SlOptions />,
  },
];

export default function Home() {
  const { user } = useCurrentUser();

  console.log(user);

  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen px-56  ">
        <div className="col-span-4 relative pt-8 ml-32 px-2 pr-4  ">
          <div
            className="text-3xl  cursor-pointer transition-all h-fit w-fit p-5
                        hover:bg-gray-600 rounded-full"
          >
            <BsTwitter />
          </div>

          <div className="mt-4  text-xl font-semibold px-2 pr-4 ">
            <ul>
              {SidebarMenuItem.map((item) => (
                <li
                  className="flex w-fit gap-4 mt-5   rounded-full hover:bg-gray-600 py-2 px-4 justify-start items-center "
                  key={item.title}
                >
                  <span className="text-3xl">{item.icon}</span>
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-5 px-5">
            <button className="bg-[#1d9bf0] font-semibold text-lg  p-4 mt-5 rounded-full w-full mx-4   ">
              Tweet
            </button>
          </div>
          {user && (
            <div className="mt-5 absolute bottom-5 flex gap-2 items-center bg-slate-800 py-5 px-2 rounded-full  ">
              {user && user.profileImageURL && (
                <Image
                  className="rounded-full "
                  src={user?.profileImageURL}
                  alt="user-image"
                  height={50}
                  width={50}
                />
              )}
              <div>
                <h3 className="text-xl">
                  {user.firstName} {user.lastName}
                </h3>
              </div>
            </div>
          )}
        </div>
        <div className="col-span-5 h-screen overflow-y-auto  border-l-[1px] border-r-[1px] border-slate-500  ">
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>
        <div className="col-span-3 p-5 ">
          {!user && (
            <div className="border p-5 bg-slate-700 rounded-lg">
              <h1 className="my-2 text-2xl">New to twitter?</h1>
              <LoginComponent />:
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
