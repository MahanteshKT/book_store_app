// import { useState } from "react";
import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
// import Register from "./pages/Register/Register";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Root from "./components/Layout/Root";
// import Dashboard from "./pages/Dashboard";
import MainPage from "./pages/Dashboard/pages/mainpage/MainPage";
import ManageBooks from "./pages/Dashboard/pages/ManageBooks/ManageBooks.jsx";
import UploadBooks from "./pages/Dashboard/pages/UploadBook/UploadBook.jsx";
import EditBook from "./pages/Dashboard/pages/EditBooks/EditBook.jsx";
import Register from "./pages/Register/Register.js";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getfromLocalStorage } from "./services/localStorage.js";
import { userAction } from "./store/user-slice/user-slice.js";
import SpinnerLoader from "./components/UI/Spinner/SpinnerLoader.jsx";
import Message from "./components/UI/Messages/Message.jsx";
import Shop from "./pages/Shop/Shop.jsx";
import { cartAction } from "./store/cart-slice/cart-slice.js";

function App() {
  const { user, token } = useSelector((state) => state.user);
  const { loading, message } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  useEffect(() => {
    const data = getfromLocalStorage("user-slice");
    const cart = getfromLocalStorage("cart-slice");
    dispatch(userAction.setLogin({ ...data }));
    console.log(cart);
    Object.keys(cart).length !== 0 &&
      token &&
      dispatch(cartAction.CartReplaceHandler({ ...cart }));
  }, []);
  return (
    <>
      {loading && <SpinnerLoader />}
      {message && <Message />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={token ? <Home /> : <Login />} />
          <Route path="/login" element={token ? <Home /> : <Login />} />
          <Route path="/register" element={!token ? <Register /> : <Home />} />
          <Route path="/about" element={token ? <Home /> : <Login />} />
          <Route path="/shop" element={token ? <Shop /> : <Login />} />
          {/* <Route path="/admin/upload-book" element={<Dashboard />} /> */}

          <Route path="/blog" element={Login ? <Home /> : <Login />} />
        </Routes>
        <Routes>
          <Route path="/admin" element={<MainPage />} />
          <Route path="/admin/upload-books" element={<UploadBooks />} />
          <Route path="/admin/manage-books" element={<ManageBooks />} />
          <Route path="/admin/edit-book/:id" element={<EditBook />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
