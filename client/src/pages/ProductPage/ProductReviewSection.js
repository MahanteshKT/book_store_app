import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import AddReview from "./AddReview";
// import CommentList from "./ReviewsList";
import ReviewsList from "./ReviewsList";
import { useSelector } from "react-redux";

function ProductReviewSection(props) {
  const [ratingeach, setRatingEach] = useState(null);
  const [writeReview, setWriteReview] = useState(false);
  const conic = {
    backgound: `conic-gradient(orange 3.6deg, #ededed 0deg)`,
  };
  const {
    totalReviews,
    AverageRating,
    ratingList,
    totalStarRating,
    recomended,
  } = useSelector((state) => state.review);
  console.log("ratingList", ratingList);
  useEffect(() => {
    console.log("useEffect calling please look at it");
    const rating = [...ratingList.slice(1)].sort((a, b) => {
      if (a.rating > b.rating) {
        return -1;
      } else {
        return 1;
      }
    });
    setRatingEach([...rating]);
  }, [ratingList]);
  return (
    <div className=" w-full bg-slate-100 gap-5 flex flex-col justify-center items-center">
      <h2 className=" font-bold text-2xl">Customer Rating & Reviews</h2>
      <div className=" flex flex-col w-full">
        <div className=" mx-6 flex md:flex-row flex-col gap-5 justify-center items-center">
          <div className="  w-[90%] md:w-[50%] lg:w-[25%] flex flex-col justify-center items-center">
            {ratingeach &&
              ratingeach.map((each) => (
                <React.Fragment key={each.rating}>
                  {+each.rating === 0 ? (
                    ""
                  ) : (
                    <div className=" w-full flex flex-row justify-between items-center gap-3">
                      <p>{each.rating} stars</p>
                      <div className=" relative items-center justify-center w-[100%] overflow-hidden flex-1 h-[0.7rem]  rounded-lg bg-slate-200">
                        <div
                          className={` absolute transition ease-in-out delay-700  duration-300  w-[${
                            each.percentage + "%"
                          }] h-full bg-green-400 z-10`}
                          style={{ width: `${each.percentage}%` }}
                        >
                          {"  "}
                        </div>
                      </div>
                      <p>{each.percentage ? each.percentage : 0}%</p>
                    </div>
                  )}
                </React.Fragment>
              ))}
          </div>

          <div className="flex flex-col text-center">
            <h2 className="text-[2.5rem] font-bold">{AverageRating}</h2>
            <div className="flex flex-row gap-2">
              {Array.from({ length: 5 }, () => 1).map((e, index) => (
                <FaStar
                  className={`text-black ${
                    Math.floor(+AverageRating) > index && "text-orange-400"
                  } `}
                  key={e._id}
                />
              ))}
            </div>
            <p className="text-md text-gray-600">
              {totalStarRating} star ratings
            </p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div
              style={{
                background: `conic-gradient(green ${recomended.percentage}%, #ededed 0deg)`,
              }}
              className={` flex justify-center items-center w-[5rem] h-[5rem] rounded-full ${conic} `}
            >
              <span className=" justify-center flex items-center bg-white rounded-full w-[4rem] h-[4rem]">
                <span className="font-bold text-lg">
                  {recomended.percentage ? +recomended.percentage : 0}%
                </span>
              </span>
            </div>
            <h2 className="font-bold text-lg">
              {recomended.percentage ? +recomended.percentage : 0}% would
              recommend
            </h2>
            <p>
              {recomended.totalRecomend ? recomended.totalRecomend : 0}{" "}
              Recommendations
            </p>
          </div>
        </div>
      </div>
      <div className="hidden  flex-col justify-center items-center w-full">
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
      {writeReview && <AddReview id={props.bookId} />}

      <ReviewsList />
    </div>
  );
}

export default ProductReviewSection;
