import React, { useState } from "react";
import Layout from "../../components/Layout/Root";
import classes from "./index.module.css";
import BannerSection from "./BannerSection/Banner";
import BooksListSection from "./BooksListSection/BooksListSection";
import AwardSection from "./AwardSection/AwardSection";
import OtherBookSection from "./OtherBooksSection/OtherBookSection";
import CustomerReviewSection from "./CusromerReviewSection/CustomerReviewSection";
import { bannerBooks, reviews } from "../../constants";

function Home() {
  const [state, setState] = useState();
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
