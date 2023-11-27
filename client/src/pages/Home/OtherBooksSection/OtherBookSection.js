import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
// import { bannerBooks } from "../../../constants";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaCartArrowDown } from "react-icons/fa";
import Favroite from "./../../../assets/favoritebook.jpg";
import { useDispatch, useSelector } from "react-redux";
import { cartAction } from "../../../store/cart-slice/cart-slice";
function OtherBookSection(props) {
  const { topBooks } = useSelector((state) => state.books);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(topBooks);
  const onClickHandler = (e, id) => {
    e.preventDefault();
    console.log(id);
    navigate(`/product/${id}`);
  };

  const onAddCartHandler = (book) => {
    dispatch(
      cartAction.CartAddItemHandler({
        _id: book._id,
        bookTitle: book.bookTitle,
        price: book.price,
      })
    );
  };

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
                    loading="lazy"
                    className=" object-cover relative hover:scale-[1.5] hover:transition duration-500 ease-out"
                  />
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      onAddCartHandler(book);
                    }}
                    className="absolute z-2 text-white top-0 right-2 p-2 shadow-sm py-3 bg-blue-600 backdrop:blur-10 rounded-sm hover:bg-orange-400 hover:text-black hover:transition eas-in-out duration-500"
                  >
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
    </>
  );
}

export default OtherBookSection;
