import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Root";
import { useDispatch, useSelector } from "react-redux";
import { GetAllBooks } from "../../services/fetch-apis";
import { uiAction } from "../../store/ui-slice/ui-slice";
import { booksAction } from "../../store/books-slice/book-slice";
import ProductList from "./ProductList";
import CategoryList from "./CategoryList";
import { useLocation } from "react-router-dom";

const inital = false;

function SearchResult(props) {
  const { state } = useLocation();
  console.log(state);
  const [allBooks, setAllBooks] = useState([]);
  const [selectedBookCategory, setSelectedBookCategory] = useState("All");
  const { books } = useSelector((state) => state.books);

  const { user, token } = useSelector((state) => state.user);
  // const [state, setState] = useState();

  const dispatch = useDispatch();
  useEffect(() => {
    console.log();
    dispatch(uiAction.loadingHandler(true));
    GetAllBooks(token)
      .then((data) => {
        dispatch(booksAction.setbooks({ books: [...data.books] }));
        if (selectedBookCategory === "All") {
          setAllBooks([...data.books]);
        }
      })
      .catch((err) => {
        booksAction.addMessage({
          status: err.status || 400,
          title: "error",
          message: err.message,
        });
      })
      .finally(() => {
        dispatch(uiAction.loadingHandler(false));
      });
  }, []);

  useEffect(() => {
    books && setAllBooks([...books]);
    if (selectedBookCategory === "All") {
      books && setAllBooks([...books]);
    } else {
      const booksByCategory = books
        .filter((each) => each.category === selectedBookCategory)
        .sort((a, b) => b - a);

      setAllBooks([...booksByCategory]);
    }
    console.log(allBooks);
  }, [selectedBookCategory]);

  const SelectCategoryHandler = (category) => {
    setSelectedBookCategory(category);
  };

  return (
    <Layout>
      <div className=" w-full flex flex-col gap-4 justify-center items-center">
        <h2 className="font-bold text-2xl">Searches...</h2>
        {/* <CategoryList selectCategory={SelectCategoryHandler} /> */}
        {books?.length === 0 && (
          <h2 style={{ margin: "10rem 0" }}> "No Products Found"</h2>
        )}

        {books?.length === 0 && <h2> "No product Found"</h2>}
        {state?.searchedInput && (
          <h2 className=" font-medium text-xl">
            searched Book is{" "}
            <span className=" font-bold">{state.searchedInput}</span>
          </h2>
        )}
        {state?.searchBooks?.length > 0 && (
          <ProductList
            className=" p-4 shadow-md  rounded-md mt-4 my-10 shadow-gray-300 bg-orange-100 w-[90%] justify-center items-center flex flex-row gap-3 basis-5 flex-wrap"
            books={state.searchBooks}
          />
        )}
      </div>
    </Layout>
  );
}

export default SearchResult;
