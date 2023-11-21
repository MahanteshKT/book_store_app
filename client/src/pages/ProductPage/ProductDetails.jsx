import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { uiAction } from "../../store/ui-slice/ui-slice";
import { getBookByBookId } from "../../services/fetch-apis";
import { booksAction } from "../../store/books-slice/book-slice";
import Layout from "../../components/Layout/Root";
import ProductImageSection from "./ProductImageSection";
import ProductDetailsSection from "./ProductDetailsSection";
import ProductReviewSection from "./ProductReviewSection";

function ProductDetails() {
  const [book, setBook] = useState({
    _id: "",
  });
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(uiAction.loadingHandler(true));
    getBookByBookId(token, id)
      .then((data) => {
        console.log(data.book);
        setBook({ ...data.book[0] });
      })
      .catch((err) => {
        uiAction.addMessage({
          status: err.status || 400,
          title: "error",
          message: err.message,
        });
      })
      .finally(() => {
        dispatch(uiAction.loadingHandler(false));
      });
  }, []);
  return (
    <Layout>
      <div className="w-[90%] mx-auto flex flex-col justify-center items-center">
        <div className=" my-[3rem]  items-center justify-center flex flex-col md:flex-row gap-5 ">
          <ProductImageSection image={book.imageUrl} />
          <ProductDetailsSection number={4} book={{ ...book }} />
        </div>
        <ProductReviewSection />
      </div>
    </Layout>
  );
}

export default ProductDetails;
