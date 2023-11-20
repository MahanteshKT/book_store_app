import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui-slice/ui-slice";
import userSlice from "./user-slice/user-slice";
import bookSlice from "./books-slice/book-slice";
import cartSlice from "./cart-slice/cart-slice";
const store = configureStore({
  reducer: {
    ui: uiSlice,
    user: userSlice,
    books: bookSlice,
    cart: cartSlice,
  },
});

export default store;
