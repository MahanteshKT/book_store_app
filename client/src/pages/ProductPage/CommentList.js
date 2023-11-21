import React from "react";
import { FaStar } from "react-icons/fa";

function CommentList() {
  return (
    <div className="w-full mb-5 flex flex-col justify-center items-center gap-5">
      <h2 className="font-bold text-xl">We Found 534 matching reviews</h2>
      <div className="w-[90%] flex flex-col gap-5 ">
        <div className="border-[1px] border-solid border-gray-400 w-full p-4 flex flex-col gap-3">
          <h2 className="font-bold text-xl">Greate Look</h2>
          <p className="flex flex-row text-orange-400 gap-1">
            <FaStar />
            <FaStar />
          </p>
          <p>commentsnns dfoisnfo nsdonfosd</p>
        </div>

        <div className="border-[1px] border-solid border-gray-400 w-full p-4 flex flex-col gap-3">
          <h2 className="font-bold text-xl">Greate Look</h2>
          <p className="flex flex-row text-orange-400 gap-1">
            <FaStar />
            <FaStar />
          </p>
          <p>commentsnns dfoisnfo nsdonfosd</p>
        </div>
      </div>
    </div>
  );
}

export default CommentList;
