import axios from "axios";
// import { getUserData } from "./Storage";
// http://127.0.0.1:3001
export const baseURL = "https://book-store-app-client-se4a.onrender.com";

axios.defaults.baseURL = "mongodb://localhost:27017";
const API_KEY = "mongodb://localhost:27017";
const REGISTER_URL = `${baseURL}/auth/register`;
const LOGIN_URL = `${baseURL}/auth/login`;
const UPLOAD_BOOKS = `${baseURL}/books/add-book`;
const GET_BOOKS_BY_ID = `${baseURL}/books/get-books/`;
const DELETE_BOOK_BY_ID = `${baseURL}/books/delete-book/`;
const GET_ALL_BOOKS = `${baseURL}/books/get-books`;
const UPDATE_BOOK_BY_ID = `${baseURL}/books/update-book/`;
const GET_BOOK_By_ID = `${baseURL}/books/get-book`;

export const RegisterApi = async (inputs) => {
  const response = await axios.post(REGISTER_URL, inputs, {
    headers: {
      "Content-type": "Application/json",
    },
  });

  if (!response.statusText === "OK") {
    const data = await response.json();
    console.log(data);
    throw new Error(data.error);
  }
};

export const LoginApi = async (inputs) => {
  let data = { email: inputs.email, password: inputs.password };
  const res = await fetch(LOGIN_URL, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "Application/json",
    },
  });
  const resData = await res.json();
  if (!res.ok) {
    throw new Error(resData.error);
  }
  return resData;
};

export const uploadBookApi = async (book, token) => {
  const res = await fetch(`${UPLOAD_BOOKS}`, {
    method: "POST",
    body: JSON.stringify(book),
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  console.log(data);
  if (!res.ok) {
    throw new Error(data.error);
  }
};

export const GetBooksByUserId = async (id, token) => {
  const res = await fetch(`${GET_BOOKS_BY_ID}${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  console.log(data);
  if (!res.ok) {
    throw new Error(data.error);
  }

  return data;
};

export const DeleteBookById = async (id, token) => {
  const res = await fetch(`${DELETE_BOOK_BY_ID}${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  console.log(data);
  if (!res.ok) {
    throw new Error(data.error);
  }
};

export const GetAllBooks = async (token) => {
  const res = await fetch(`${GET_ALL_BOOKS}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error);
  }
  return data;
};

export const getBookByBookId = async (token, id) => {
  const res = await fetch(`${GET_BOOK_By_ID}/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error);
  }
  return data;
};

export const updateBookApi = async (book, id, userID, token) => {
  const res = await fetch(`${UPDATE_BOOK_BY_ID}${userID}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(book),
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  console.log(data);
  if (!res.ok) {
    throw new Error(data.error);
  }
};
