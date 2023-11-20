import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: false,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export let userAction = userSlice.actions;
export default userSlice.reducer;
