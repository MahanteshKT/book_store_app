import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import AddReview from "./AddReview";
import CommentList from "./CommentList";

function ProductReviewSection() {
  const [writeReview, setWriteReview] = useState(false);
  const conic = {
    backgound: `conic-gradient(orange 3.6deg, #ededed 0deg)`,
  };

  return (
    <div className=" w-full bg-slate-100 gap-5 flex flex-col justify-center items-center">
      <h2 className=" font-bold text-2xl">Customer Rating & Reviews</h2>
      <div className=" flex flex-col w-full">
        <div className=" mx-6 flex md:flex-row flex-col gap-5 justify-center items-center">
          <div className="  w-[90%] md:w-[50%] lg:w-[25%] flex flex-col justify-center items-center">
            <div className=" w-full flex flex-row justify-between items-center gap-3">
              <p>5 stars</p>
              <div className=" relative w-full overflow-hidden flex-1 h-[0.7rem]  rounded-lg bg-slate-200">
                <div className=" absolute  w-[50%] h-full bg-green-400 z-10">
                  {" "}
                </div>
              </div>
              <p>88%</p>
            </div>

            <div className=" w-full flex flex-row justify-between items-center gap-3">
              <p>4 stars</p>
              <div className=" relative w-full overflow-hidden flex-1 h-[0.7rem]  rounded-lg bg-slate-200">
                <div className=" absolute  w-[50%] h-full bg-green-400 z-10">
                  {" "}
                </div>
              </div>
              <p>88%</p>
            </div>

            <div className=" w-full flex flex-row justify-between items-center gap-3">
              <p>3 stars</p>
              <div className=" relative w-full overflow-hidden flex-1 h-[0.7rem]  rounded-lg bg-slate-200">
                <div className=" absolute  w-[50%] h-full bg-green-400 z-10">
                  {" "}
                </div>
              </div>
              <p>88%</p>
            </div>

            <div className=" w-full flex flex-row justify-between items-center gap-3">
              <p>2 stars</p>
              <div className=" relative w-full overflow-hidden flex-1 h-[0.7rem]  rounded-lg bg-slate-200">
                <div className=" absolute  w-[50%] h-full bg-green-400 z-10">
                  {" "}
                </div>
              </div>
              <p>88%</p>
            </div>

            <div className=" w-full flex flex-row justify-between items-center gap-3">
              <p>1 stars</p>
              <div className=" relative w-full overflow-hidden flex-1 h-[0.7rem]  rounded-lg bg-slate-200">
                <div className=" absolute  w-[50%] h-full bg-green-400 z-10">
                  {" "}
                </div>
              </div>
              <p>88%</p>
            </div>
          </div>

          <div className="flex flex-col text-center">
            <h2 className="text-[2.5rem] font-bold">4.8</h2>
            <div className="flex flex-row gap-2">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <p className="text-md text-gray-600">1805 star ratings</p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div
              style={{
                background: `conic-gradient(green 350deg, #ededed 0deg)`,
              }}
              className={` flex justify-center items-center w-[5rem] h-[5rem] rounded-full ${conic} `}
            >
              <span className=" justify-center flex items-center bg-white rounded-full w-[4rem] h-[4rem]">
                <span className="font-bold text-lg">95%</span>
              </span>
            </div>
            <h2 className="font-bold text-lg">95% would recommend</h2>
            <p>424 Recommendations</p>
          </div>
        </div>
      </div>
      <div className="hidden flex flex-col justify-center items-center w-full">
        <h2>Review Images</h2>
        <div className="flex justify-start items-start w-full gap-5">
          <div className="w-[5rem] h-[5rem] md:h-max-[7rem] md:w-max-[7rem]  border-2 border-solid">
            <img alt="sdf" />
          </div>
          <div className="w-[5rem] h-[5rem] md:h-max-[7rem] md:w-max-[7rem]  border-2 border-solid">
            <img alt="sdf" />
          </div>
          <div className="w-[5rem] h-[5rem] text-center justify-center items-center md:h-max-[7rem] md:w-max-[7rem]  border-2 border-solid">
            <Link to="#" className="text-[0.7rem] underline">
              See more review images
            </Link>
          </div>
        </div>
      </div>

      <Button
        className=" bg-red-600 my-3"
        onClick={(e) => {
          e.preventDefault();
          setWriteReview(!writeReview);
        }}
      >
        Write a Review
      </Button>
      {writeReview && <AddReview />}

      <CommentList />
    </div>
  );
}

export default ProductReviewSection;
