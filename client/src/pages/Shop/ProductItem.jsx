import React from "react";
import Button from "../../components/UI/Button/Button";
import { FaCaretLeft, FaShoppingBag, FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { cartAction } from "../../store/cart-slice/cart-slice";
import { useNavigate } from "react-router-dom";

function ProductItem(props) {
  const { book } = props;
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onAddCartHandler = (e) => {
    e.preventDefault();
    console.log(items);
    dispatch(
      cartAction.CartAddItemHandler({
        _id: props.book._id,
        bookTitle: props.book.bookTitle,
        price: props.book.price,
      })
    );
  };

  const onClickHandler = (e, id) => {
    e.preventDefault();
    console.log(id);
    navigate(`/product/${id}`);
  };

  return (
    <div className="flex gap-3 flex-col  p-4  shadow-md w-[80%] lg:h-[40rem] sm:w-[40%] md:w-[20rem] lg:w-[20rem]  bg-white-400 rounded-md">
      <div className="cursor-pointer mx-auto flex flex-col items-center justify-center w-[13rem] h-[17rem]  rounded-md overflow-hidden shadow-sm  border-2 border-solid">
        <img
          onClick={(e) => onClickHandler(e, book._id)}
          className="hover:scale-[1.5] hover:transition duration-500 ease-out  object-contain"
          src={`${book?.imageUrl}`}
          alt={book?.bookTitle}
          loading="lazy"
        />
      </div>
      <h2
        onClick={(e) => onClickHandler(e, book._id)}
        className=" capitalize cursor-pointer font-bold text-xl hover:text-orange-500 "
      >
        {book.bookTitle}
      </h2>
      <p className=" break-words text-sm text-gray-400">
        by <span className=" font-medium text-gray-500">{book.authorName}</span>
      </p>
      <p className=" text-gray-600 font-small text-sm">
        {String(book.bookDescription).slice(0, 120)}
      </p>
      <h3 className=" font-bold text-xl">
        &#8377;{Number(book.price).toFixed(2) || 0}
      </h3>
      <div className="flex gap-3 flex-col md:flex-col">
        <Button
          onClick={onAddCartHandler}
          className=" flex justify-center items-center gap-2"
        >
          <FaShoppingCart /> Add to Cart
        </Button>
        <Button className="bg-yellow-300 flex justify-center items-center gap-2 ">
          <FaShoppingBag /> Buy Now
        </Button>
      </div>
    </div>
  );
}

export default ProductItem;
