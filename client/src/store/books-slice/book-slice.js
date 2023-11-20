import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: null,
  bestSellerBooks: null,
  userBooks: null,
};

const booksSlice = createSlice({
  name: "booksSlice",
  initialState,
  reducers: {
    setbooks: (state, action) => {
      state.books = action.payload.books;
    },
    removeAllBooks: (state) => {
      state.books = null;
    },
    setUserBooks: (state, action) => {
      state.userBooks = action.payload.books;
    },
    updateUserBook: (state, action) => {
      const updatedBook = action.payload.book;
      const updatedUserBooks = state.userBooks.map((each) => {
        if (each._id === updatedBook._id) {
          return updatedBook;
        }
        return each;
      });
      state.userBooks = updatedUserBooks;
    },
  },
});

export let booksAction = booksSlice.actions;
export default booksSlice.reducer;
