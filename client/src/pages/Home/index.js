import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Root";
import classes from "./index.module.css";
import BannerSection from "./BannerSection/Banner";
import BooksListSection from "./BooksListSection/BooksListSection";
import AwardSection from "./AwardSection/AwardSection";
import OtherBookSection from "./OtherBooksSection/OtherBookSection";
import CustomerReviewSection from "./CusromerReviewSection/CustomerReviewSection";
import { bannerBooks, reviews } from "../../constants";
import { GetAllBooks, topTenBooks } from "../../services/fetch-apis";
import { useDispatch, useSelector } from "react-redux";
import { booksAction } from "../../store/books-slice/book-slice";
import { uiAction } from "../../store/ui-slice/ui-slice";
function Home() {
  const { user, token } = useSelector((state) => state.user);
  // const [state, setState] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(uiAction.loadingHandler(true));
    GetAllBooks(token)
      .then((data) => {
        dispatch(booksAction.setbooks({ books: [...data.books] }));
        return topTenBooks(token);
      })
      .then((topBooks) => {
        console.log(topBooks);
        dispatch(booksAction.AddTopBooks({ books: [...topBooks.books] }));
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

  useEffect(() => {}, []);
  return (
    <Layout>
      <div className={classes.Banner}>
        <BannerSection />
      </div>
      <div className={classes.booksList}>
        <BooksListSection bannerBooks={bannerBooks} />
      </div>
      <div className={classes.awards}>
        <AwardSection />
      </div>
      <div className={classes.otherBooks}>
        <OtherBookSection bannerBooks={bannerBooks} />
      </div>
      <div className={classes.customerReview}>
        <CustomerReviewSection reviews={reviews} />
      </div>
    </Layout>
  );
}

export default Home;
