import { createSlice } from "@reduxjs/toolkit";
import { addtolocalStorage } from "../../services/localStorage";

const initialState = {
  TotalAmount: 0,
  items: [],
  totalQuantity: 0,
  changed: false,
  action: "",
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    CartReplaceHandler(state, action) {
      const { items = [], totalQuantity = 0, TotalAmount } = action.payload;
      state.items = items;
      state.totalQuantity = totalQuantity;
      state.TotalAmount = TotalAmount;
    },
    CartAddItemHandler(state, action) {
      const newItem = action.payload;
      const existedItem = state.items.find((item) => item._id === newItem._id);
      state.changed = true;
      let totalAmount = 0;
      if (existedItem) {
        existedItem.quantity += 1;
        existedItem.total = newItem.price * existedItem.quantity;
        totalAmount += existedItem.price;
      } else {
        state.items.push({
          ...newItem,
          quantity: 1,
          total: +newItem.price,
        });
        totalAmount += +newItem.price;
      }

      state.totalQuantity += 1;
      state.TotalAmount += totalAmount;
      state.action = "add";
      addtolocalStorage("cart-slice", {
        totalQuantity: state.totalQuantity,
        TotalAmount: state.TotalAmount,
        items: state.items,
        action: state.action,
        changed: state.changed,
      });
    },
    CartRemoveItemHandler(state, action) {
      const itemId = action.payload.id;
      console.log();
      const existedItem = state.items.find((item) => item._id === itemId);
      console.log(existedItem);
      state.changed = true;
      if (existedItem.quantity > 1) {
        existedItem.quantity -= 1;
        existedItem.total -= existedItem.price;
      } else {
        state.items = state.items.filter((item) => item._id !== itemId);
      }
      state.TotalAmount -= existedItem.price;
      state.totalQuantity -= 1;
      state.action = "remove";
    },
    EmptyCart(state) {
      console.log(state);
      state.items = initialState.items;
      state.TotalAmount = initialState.TotalAmount;
      state.totalQuantity = initialState.totalQuantity;
      state.action = initialState.action;
    },
  },
});

export let cartAction = cartSlice.actions;
export default cartSlice.reducer;
