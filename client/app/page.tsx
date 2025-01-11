import { BsTwitter, BsBell, BsEnvelope, BsBookmark } from "react-icons/bs";
import React from "react";
import { BiHash, BiHomeCircle, BiUser } from "react-icons/bi";

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
    title: "Profile",
    icon: <BiUser />,
  },
];

export default function Home() {
  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen px-56  ">
        <div className="col-span-3 pt-8 ">
          <div className="text-3xl cursor-pointer transition-all h-fit p-2 hover:bg-gray-600 rounded-full">
            <BsTwitter />
          </div>

          <div className="mt-4 text-2xl  font-semibold  px-2 pr-4 ">
            <ul>
              {SidebarMenuItem.map((item) => (
                <li
                  className="flex w-fit gap-4 rounded-full hover:bg-gray-600 py-2 px-4 justify-start items-center "
                  key={item.title}
                >
                  <span className="text-2xl">{item.icon}</span>
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
        </div>
        <div className="col-span-6 border-l-[1px] border-r-[1px] border-slate-500  "></div>
        <div className="col-span-3"></div>
      </div>
    </div>
  );
}
