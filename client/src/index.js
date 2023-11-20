import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider, useDispatch } from "react-redux";
import store from "./store";
import { getfromLocalStorage } from "./services/localStorage";
import { cartAction } from "./store/cart-slice/cart-slice";
import { userAction } from "./store/user-slice/user-slice";
const root = ReactDOM.createRoot(document.getElementById("root"));
const SetData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = getfromLocalStorage("user-slice");
    const cart = getfromLocalStorage("cart-slice");
    const addToStore = () => {
      console.log(user);
      dispatch(cartAction.CartReplaceHandler({ ...cart }));
      dispatch(userAction.setLogin({ ...user }));
    };
    {
      Object.keys(cart).length !== 0 &&
        Object.keys(cart).length !== 0 &&
        addToStore();
    }
  }, []);

  return;
};
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
