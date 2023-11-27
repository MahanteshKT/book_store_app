import React from "react";
import Button from "../../components/UI/Button/Button";
import { RiRestartFill } from "react-icons/ri";
import { FaShoppingBag, FaShoppingCart, FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { cartAction } from "../../store/cart-slice/cart-slice";
import { uiAction } from "../../store/ui-slice/ui-slice";

function ProductDetailsSection(props) {
  const book = props.book;
  const dispatch = useDispatch();
  const { totalReviews, totalStarRating, AverageRating, recomended } =
    useSelector((state) => state.review);

  const cartHandler = (e) => {
    e.preventDefault();
    dispatch(
      cartAction.CartAddItemHandler({
        _id: book._id,
        bookTitle: book.bookTitle,
        price: book.price,
      })
    );
  };

  const orderHandler = (e) => {
    e.preventDefault();
    console.log("Ordering......");
  };

  return (
    <div className="flex flex-1 flex-col gap-2">
      <h2 className=" cursor-pointer font-[800] text-start text-2xl leading-8 text-black hover:text-orange-500 break-words">
        {book.bookTitle}
      </h2>
      <h2 className="font-medium text-start text-[1.1rem]">
        by{" "}
        <span className=" cursor-pointer font-[650] text-orange-400">
          {book.authorName}
        </span>
      </h2>
      <div className=" my-1 flex items-center gap-2">
        <p className="  text-orange-400 flex gap-1">
          {Array.from({ length: 5 }, () => 1).map((e, index) => (
            <FaStar
              className={`text-black ${
                Math.floor(+AverageRating) > index && "text-orange-400"
              } `}
              key={e._id}
            />
          ))}
        </p>

        <p className=" cursor-pointer font-bold flex gap-1">
          {totalReviews}
          <p className=" text-black"> reviews</p>
        </p>
      </div>
      <h2 className=" font-bold flex gap-3 mb-1 items-center">
        <p className=" text-red-600 font-bold text-2xl">&#8377;{book.price}</p>
        <p>M.R.P</p>
      </h2>
      <div className="flex flex-row gap-5 my-2">
        <Button
          onClick={orderHandler}
          className="flex flex-row justify-center items-center gap-1"
        >
          {" "}
          <FaShoppingCart /> Buy Now
        </Button>
        <Button
          onClick={cartHandler}
          className="flex items-center justify-center gap-1"
        >
          {" "}
          <FaShoppingBag /> Add To Cart
        </Button>
      </div>
      <div className="my-3 mt-3 gap-2 flex flex-col items-start">
        <h1 className="font-bold text-2xl text-start">Product Description</h1>
        <p className=" break-words leading-normal text-sm font-medium text-gray-500">
          {book.bookDescription}
        </p>
      </div>
    </div>
  );
}

export default ProductDetailsSection;
