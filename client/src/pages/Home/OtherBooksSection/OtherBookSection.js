import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
// import { bannerBooks } from "../../../constants";
import { Link } from "react-router-dom";
import { FaCartArrowDown } from "react-icons/fa";
import Favroite from "./../../../assets/favoritebook.jpg";
function OtherBookSection(props) {
  return (
    <>
      <h2 className=" text-black font-bold text-[1.5rem] md:text-[2rem] font-montserrat">
        Other Books
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
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper w-[50%] sm:w-[60%] md:w-[90%] my-[2rem]"
      >
        {/* <SwiperSlide>Slide 1</SwiperSlide> */}
        {props.bannerBooks &&
          props.bannerBooks.map((book) => (
            <SwiperSlide key={book._id} className=" relative w-[90%] ">
              <Link to={`/${book._id}`}>
                <div className="shadow-xl rounded-md overflow-hidden ">
                  <img
                    src={book.ImgSrc}
                    className="hover:scale-[1.5] hover:transition duration-500 ease-out"
                  />
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="  leading-2">
                    <h3 className="text-md font-bold capitalize ">
                      {book.title}
                    </h3>
                    <h3 className=" text-gray-500 text-sm">{book.author}</h3>
                  </div>
                  <h3 className=" text-orange-400 font-medium">
                    &#8377;{Number(book.price).toFixed(2)}
                  </h3>
                </div>
              </Link>
              <div className=" absolute z-2 text-white top-0 right-1 p-2 bg-blue-600 backdrop:blur-10 rounded-sm hover:bg-orange-400 hover:text-black hover:transition eas-in-out duration-500">
                <FaCartArrowDown />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}

export default OtherBookSection;
