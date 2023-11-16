import React from "react";
import Button from "../../../components/UI/Button/Button";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
import "./Banner.css";
// import required modules
import { EffectCards } from "swiper/modules";
import { slideBooks } from "../../../constants";
function BannerSection() {
  return (
    <>
      <div className="flex  flex-col gap-6  ">
        <h2 className="flex flex-col text-left leading-none gap-1 font-bold text-[1.9rem] lg:text-[2.5rem]">
          Buy and sell your books{" "}
          <span className=" text-orange-400 ">for the best prices</span>
        </h2>
        <p className=" text-gray-600 font-montserrat break-words text-[0.8rem] lg:w-[70%]  md:text-[1rem]">
          find and read more books you'll love, and keep track of the books you
          want to read. Be part of the world's largest community of the book
          lovers on Goodreads.
        </p>
        <form className="h-10  md:w-full rounded-sm flex flex-row">
          <input
            className=" h-full outline-none p-2"
            placeholder="Search a book here..."
          />
          <Button className=" text-yellow-50">Search</Button>
        </form>
      </div>
      <div className="banner  px:[6rem]  py-[2rem] md:py-[6rem] md:px-[7rem] lg:px-[10rem] ">
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
          className="mySwiper"
        >
          {/* <SwiperSlide>Slide 1</SwiperSlide> */}
          {slideBooks.map((each) => (
            <SwiperSlide key={each._id}>
              <img src={each.ImgSrc} alt="3dnjfnj" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

export default BannerSection;
