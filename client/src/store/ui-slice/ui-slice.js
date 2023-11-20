import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showCart: false,
  message: null,
  loading: false,
};

const uiSlice = createSlice({
  name: "uiSlice",
  initialState,
  reducers: {
    showCartHandler(state) {
      state.showCart = !state.showCart;
    },
    loadingHandler(state, action) {
      state.loading = action.payload;
    },
    addMessage(state, Appmessage) {
      const { status, title, message } = Appmessage.payload;
      state.message = {
        status,
        title,
        message,
      };
    },
    deleteMessage(state) {
      state.message = null;
    },
  },
});

export let uiAction = uiSlice.actions;
export default uiSlice.reducer;
