import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";

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
    <div className="border-[3px] py-3 mt-5 bg-gray-200 rounded-md">
      <input
        className="p-2 rounded-2xl min-w-[50%] mt-5 "
        type="search"
        placeholder="search here"
        value={searchTerm}
        onChange={(e) => setSearcTerm(e.target.value)}
      />
      <div className="flex flex-col gap-5 mt-5">
        {filteredData.length > 0 &&
          filteredData.map((paste) => {
            return (
              <div className="border" key={paste?._id}>
                <div>
                  <h1 className="text-2xl font-semibold mt-2">{paste.title}</h1>
                </div>
                <div>
                  <h3 className="text-2xl font-sans mt-2">{paste.content}</h3>
                </div>

                <div className="flex flex-row gap-1 place-content-end mt-2">
                  <button className="bg-blue-600 w-[4rem] h-8 rounded-full">
                    <a href={`/?pasteId=${paste?._id}`}>Edit</a>
                  </button>
                  <button className="bg-yellow-300 w-14 rounded-full">
                    <a href={`/pastes/${paste?._id}`}>View</a>
                  </button>
                  <button
                    className="bg-red-600 w-14 rounded-full"
                    onClick={() => handleDelete(paste?._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-gray-100 w-14 rounded-full"
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success("copied to clipboard");
                    }}
                  >
                    Copy
                  </button>
                  <button
                    className="bg-green-600 w-14 rounded-full"
                    onClick={handleShare}
                  >
                    Share
                  </button>
                </div>
                <div>{paste.createdAt}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Paste;
