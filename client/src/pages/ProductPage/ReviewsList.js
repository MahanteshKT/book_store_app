import React from "react";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";

function ReviewsList() {
  const { reviews } = useSelector((state) => state.review);
  const { totalReviews, AverageRating } = useSelector((state) => state.review);

  console.log(reviews, "reviews");
  return (
    <div className="w-full mb-5 flex flex-col justify-center items-center gap-5">
      <h2 className="font-bold text-xl">
        We Found {totalReviews} matching reviews
      </h2>
      <div className="w-[90%] flex flex-col gap-5 ">
        {reviews &&
          reviews.map((each) => (
            <div
              key={each._id}
              className="border-[1px] border-solid border-gray-400 rounded-md shadow-sm w-full p-4 flex flex-col gap-3"
            >
              <h2 className="font-bold text-md">{each.userName}</h2>
              <p className="flex flex-row text-black gap-1 items-center">
                {Array.from({ length: 5 }, () => 1).map((e, index) => (
                  <FaStar
                    className={`text-black ${
                      each.Rating > index && "text-orange-400"
                    } `}
                    key={e._id}
                  />
                ))}
                <p className=" text-md font-medium text-gray-500">
                  ({each.Rating}) reviews
                </p>
              </p>
              <p className=" leading-normal text-gray-900 font-medium break-words text-[1.1rem]">
                {each.commentDescription}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ReviewsList;
