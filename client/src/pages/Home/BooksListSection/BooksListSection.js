import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
// import { bannerBooks } from "../../../constants";
import { Link, useNavigate } from "react-router-dom";
import { FaCartArrowDown } from "react-icons/fa";
import Favroite from "./../../../assets/favoritebook.jpg";
import { useSelector } from "react-redux";
function BooksListSection(props) {
  const { topBooks } = useSelector((state) => state.books);
  const navigate = useNavigate();
  console.log(topBooks);
  const onClickHandler = (e, id) => {
    e.preventDefault();
    console.log(id);
    navigate(`/product/${id}`);
  };

  return (
    <>
      <h2 className=" text-black font-bold text-[1.5rem] md:text-[2rem] font-montserrat">
        Best Seller Books
      </h2>

      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          300: {
            spaceBetween: 10,
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 30,
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
        {topBooks &&
          topBooks?.map((book) => (
            <SwiperSlide key={book._id} className="md:w-[90%] ">
              <Link to={`/${book._id}`}>
                <div className="  shadow-xl rounded-md overflow-hidden ">
                  <img
                    onClick={(e) => onClickHandler(e, book._id)}
                    src={book.imageUrl}
                    className=" object-cover relative hover:scale-[1.5] hover:transition duration-500 ease-out"
                  />
                  <div className="absolute z-2 text-white top-0 right-2 p-2 shadow-sm py-3 bg-blue-600 backdrop:blur-10 rounded-sm hover:bg-orange-400 hover:text-black hover:transition eas-in-out duration-500">
                    <FaCartArrowDown />
                  </div>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="  leading-2 hover:text-orange-500">
                    <h3
                      onClick={(e) => onClickHandler(e, book._id)}
                      className="text-md font-bold capitalize "
                    >
                      {book.bookTitle.length > 22
                        ? book.bookTitle.slice(0, 20)
                        : book.bookTitle}
                    </h3>
                    <h3 className=" text-gray-500 text-sm">
                      {book.authorName}
                    </h3>
                  </div>
                  <h3 className=" text-orange-400 font-medium">
                    &#8377;{Number(book.price).toFixed(2)}
                  </h3>
                </div>
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
      <div className="flex-col w-[100%]  md:flex md:items-center md:flex-row  gap-2 items-center ">
        <div className="overflow-hidden w-full h-full md:h-full md:max-w-[70%]  flex justify-center items-center ">
          <img
            src={Favroite}
            className=" object-cover w-[80%] h-[50%]  md:w-[60%]"
            alt="favorite"
          />
        </div>
        <div className="px-[0rem] py-[2rem] flex flex-col gap-3 md:px-[2rem] lg:p-[4rem] w-full">
          <h2 className="flex flex-col text-left leading-none gap-1 font-bold text-[2rem]">
            Find Your Favorite
            <span className=" text-orange-400 ">Book Here!</span>
          </h2>
          <p className=" text-gray-600 font-montserrat break-words text-[0.7rem]">
            find and read more books you'll love, and keep track of the books
            you want to read. Be part of the world's largest community of the
            book lovers on Goodreads.
          </p>

          <div className="flex justify-evenly w-full  gap-1">
            <div>
              <h2 className="font-bold text-2xl ">800+</h2>
              <p className="text-[0.8rem] md:text-[1rem] text-gray-600  sd:text-[0.8rem]">
                Book Listing
              </p>
            </div>
            <div>
              <h2 className="font-bold text-2xl">550+</h2>
              <p className="text-[0.8rem] md:text-[1rem]  text-gray-600 sd:text-[0.8rem]">
                Register User
              </p>
            </div>
            <div>
              <h2 className="font-bold text-2xl">1200+</h2>
              <p className="text-[0.8rem] md:text-[1rem]  text-gray-600 sd:text-[0.8rem]">
                Pdf Downloaded
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BooksListSection;
