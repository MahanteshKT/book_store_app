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
import ManageBooks from "./pages/Dashboard/pages/ManageBooks";
import UploadBooks from "./pages/Dashboard/pages/UploadBook/UploadBook.jsx";
import EditBook from "./pages/Dashboard/pages/EditBooks/EditBook.jsx";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Home />} />
          <Route path="/about" element={<Home />} />
          <Route path="/shop" element={<Home />} />
          {/* <Route path="/admin/upload-book" element={<Dashboard />} /> */}

          <Route path="/blog" element={<Home />} />
        </Routes>
        <Routes>
          <Route path="/admin" element={<MainPage />} />
          <Route path="/admin/upload-books" element={<UploadBooks />} />
          <Route path="/admin/manage-books" element={<ManageBooks />} />
          <Route path="/admin/edit-book" element={<EditBook />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
