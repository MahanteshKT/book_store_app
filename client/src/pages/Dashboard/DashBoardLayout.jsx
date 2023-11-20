import React, { useEffect } from "react";
import Layout from "../../components/Layout/Root";
import SideBar from "./pages/SideBar/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { getfromLocalStorage } from "../../services/localStorage";
import { userAction } from "../../store/user-slice/user-slice";
function DashboardLayout(props) {
  const bookStore = useSelector((state) => state.books);
  const { user, token } = useSelector((state) => state.user);
  const { loading, message } = useSelector((state) => state.ui);
  console.log(loading, message);
  const dispatch = useDispatch();
  console.log(bookStore);
  useEffect(() => {
    const data = getfromLocalStorage("user-slice");
    dispatch(userAction.setLogin({ ...data }));
  }, []);

  return (
    <div className="flex gap-4 flex-col md:flex-row">
      <SideBar />
      {props.children}
    </div>
  );
}

export default DashboardLayout;
