import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
// import { reviews } from "../../../constants";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import { baseURL } from "../../../services/fetch-apis";
function CustomerReviewSection(props) {
  const { topReviews } = useSelector((state) => state.review);
  return (
    <>
      <h2 className="font-bold text-[1.5rem] md:text-[2rem] text-center">
        Our Customers
      </h2>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper w-full h-full  my-[2rem]"
      >
        {/* <SwiperSlide>Slide 1</SwiperSlide> */}
        {topReviews &&
          topReviews.map((each) => (
            <SwiperSlide
              key={each._id}
              className="shadow-xl  p-3  w-full my-[2rem] md:my-10 h-full rounded-md "
            >
              <div className=" flex flex-col items-start justify-center  break-words gap-2">
                <div className="flex gap-2">
                  {Array(5)
                    .fill(0)
                    .map((_, index) => (
                      <FaStar
                        key={index}
                        size={15}
                        className={`
                        ${
                          each.Rating > index
                            ? " text-orange-500"
                            : " text-gray-600"
                        }`}
                      />
                    ))}
                </div>
                <p className="text-[0.9rem] text-gray-600 break-words">
                  {each.commentDescription}
                </p>
              </div>
              <div className="flex  flex-col items-start py-2 gap-2">
                <img
                  className="w-10 h-10 object-contain bg-slate-500 rounded-full"
                  src={`${baseURL}/assets/${each.userDetails.picturePath}`}
                  alt="userImg"
                />
                <div>
                  <h2 className="font-bold text-[0.9rem] text-black">
                    {each.userName}
                  </h2>
                  <h3 className="text-gray-400 text-[0.8rem] font-medium">
                    {each.userDetails.occupation},
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}

export default CustomerReviewSection;
