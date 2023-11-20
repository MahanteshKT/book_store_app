import React, { useEffect } from "react";
// import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Message from "../UI/Messages/Message";
import { useSelector } from "react-redux";
import SpinnerLoader from "../UI/Spinner/SpinnerLoader";
import store from "../../store";
import Cart from "../Cart/Cart";
// import { addtolocalStorage } from "../../services/localStorage";

function Layout(props) {
  const { showCart } = useSelector((state) => state.ui);
  // const userSlice = useSelector((state) => state.user);
  // const message = useSelector((state) => state.ui.message);
  // const loader = useSelector((state) => state.ui.loading);
  // console.log(message, loader);
  // useEffect(() =>
  // }, []);

  return (
    <>
      {showCart && <Cart />}
      <Header />

      <main> {props.children}</main>
      <Footer />
    </>
  );
}

export default Layout;
