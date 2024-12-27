import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { TbEdit } from "react-icons/tb";
import { LuView } from "react-icons/lu";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { RxCopy } from "react-icons/rx";
import { IoMdShare } from "react-icons/io";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  console.log(pastes);
  const [searchTerm, setSearcTerm] = useState("");
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }
  const handleShare = async () => {
    // Check if the Web Share API is supported
    if (navigator.share) {
      try {
        // Customize the content to be shared
        await navigator.share({
          title: "Check out this content",
          content: "I found something interesting to share with you.",
          url: window.location.href, // You can use any URL here
        });
      } catch (error) {
        console.error("Error sharing content:", error);
      }
    }
    toast.success("shared now");
  };

  return (
    <div className="border py-3 mt-5 bg-gray-200 rounded-md text-white">
      <input
        className="p-2 rounded-2xl min-w-[50%] mt-5 "
        type="search"
        placeholder="Search here"
        value={searchTerm}
        onChange={(e) => setSearcTerm(e.target.value)}
      />
      <div className="flex flex-col gap-5 mt-5">
        {filteredData.length > 0 &&
          filteredData.map((paste) => {
            return (
              <div className="border" key={paste?._id}>
                <div>
                  <h1 className="text-2xl font-semibold mt-2 flex justify-start pl-2 text-black">
                    {paste.title}
                  </h1>
                </div>
                <div>
                  <h3 className="text-1xl font-sans mt-2 flex justify-start pl-2 text-blue-700">
                    {paste.content}
                  </h3>
                </div>

                <div className="flex flex-row gap-4 place-content-end mt-2 pr-4">
                  <button className="border-solid border-2 border-sky-500 bg-gray-900 w-7 h-6 pl-1 ">
                    <a href={`/?pasteId=${paste?._id}`}>
                      {" "}
                      <TbEdit />
                    </a>
                  </button>
                  <button className="border-solid border-2 border-sky-500 bg-gray-900 w-7 h-6 pl-1 ">
                    <a href={`/pastes/${paste?._id}`}>
                      <LuView />
                    </a>
                  </button>
                  <button
                    className="border-solid border-2 border-sky-500 bg-gray-900 w-7 h-6 pl-1 "
                    onClick={() => handleDelete(paste?._id)}
                  >
                    <RiDeleteBin5Fill />
                  </button>
                  <button
                    className="border-solid border-2 border-sky-500 bg-gray-900 w-7 h-6 pl-1 "
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success("copied to clipboard");
                    }}
                  >
                    <RxCopy />
                  </button>
                  <button
                    className="border-solid border-2 border-sky-500 bg-gray-900 w-7 h-6 pl-1 "
                    onClick={handleShare}
                  >
                    <IoMdShare />
                  </button>
                </div>
                <div className="flex justify-end pr-4 text-black">
                  {paste.createdAt}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Paste;
