import React, { useEffect, useState } from "react";
import { RiCloseFill, RiErrorWarningFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { uiAction } from "../../../store/ui-slice/ui-slice";

function Message() {
  const message = useSelector((state) => state.ui.message);
  const dispatch = useDispatch();
  const [show, setshow] = useState(true);
  const onCloseHandler = (e) => {
    e.preventDefault();
    setshow(false);
    dispatch(uiAction.deleteMessage());
  };
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setshow(false);
      dispatch(uiAction.deleteMessage());
    }, 5000);
    return () => {
      clearTimeout(timeOut);
    };
  }, []);
  return (
    <div
      className={` fixed flex top-[3rem] px-6 pr-3 py-3 right-[0px] border-l-[0.33rem] shadow-md border-orange-500 rounded-md z-50 justify-between items-center gap-3
    ${message?.title === "error" ? ` bg-red-300 text-red-700` : ""} ${
        message?.title === "success" && " bg-green-300 text-green-600"
      } ${message?.title === "warning" && " bg-yellow-100 text-yellow-400"}
      animate-[showSlide] animate-pulse `}
    >
      <div
        className={`break-words flex gap-2 flex-row items-center justify-center `}
      >
        <div className="text-2xl mr-1">
          <RiErrorWarningFill />
        </div>
        <h2 className={`font-medium capitalize`}>{message.title}:</h2>
        <h3>status {message?.status || 300} </h3>
        <p>{message?.message || "do not do this"}</p>
      </div>
      <div
        className=" cursor-pointer px-2 text-2xl font-bold hover:text-orange-400 "
        onClick={onCloseHandler}
      >
        <RiCloseFill />
      </div>
    </div>
  );
}

export default Message;
