import React from "react";
import Button from "../../components/UI/Button/Button";
import { RiRestartFill } from "react-icons/ri";
import { FaShoppingBag, FaShoppingCart, FaStar } from "react-icons/fa";

function ProductDetailsSection(props) {
  const book = props.book;
  return (
    <div className="flex flex-1 flex-col gap-2">
      <h2 className=" cursor-pointer font-[800] text-2xl leading-8 text-black hover:text-orange-500 break-words">
        {book.bookTitle}
      </h2>
      <h2 className="font-medium text-[1.1rem]">
        by{" "}
        <span className=" cursor-pointer font-[650] text-orange-400">
          {book.authorName}
        </span>
      </h2>
      <div className=" my-1 flex items-center gap-2">
        <p className="  text-orange-400 flex gap-1">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
        </p>
        <p className=" cursor-pointer font-bold">2555</p>
      </div>
      <h2 className=" font-bold flex gap-3 mb-1 items-center">
        <p className=" text-red-600 font-bold text-2xl">&#8377;{book.price}</p>
        <p>M.R.P</p>
      </h2>
      <div className="flex flex-row gap-5 my-2">
        <Button className="flex flex-row justify-center items-center gap-1">
          {" "}
          <FaShoppingCart /> Buy Now
        </Button>
        <Button className="flex items-center justify-center gap-1">
          {" "}
          <FaShoppingBag /> Add To Cart
        </Button>
      </div>
      <div className="my-3 mt-3 gap-2 flex flex-col">
        <h1 className="font-bold text-2xl">Product Description</h1>
        <p className=" break-words leading-normal text-sm font-medium text-gray-500">
          {book.bookDescription}
        </p>
      </div>
    </div>
  );
}

export default ProductDetailsSection;
