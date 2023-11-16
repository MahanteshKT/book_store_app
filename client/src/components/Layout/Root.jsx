import React from "react";
// import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

function Layout(props) {
  return (
    <>
      <Header />

      <main> {props.children}</main>
      <Footer />
    </>
  );
}

export default Layout;
