import React from "react";
import Layout from "../../components/Layout/Root";
import SideBar from "./pages/SideBar/SideBar";

function DashboardLayout(props) {
  return (
    <div className="flex gap-4 flex-col md:flex-row">
      <SideBar />
      {props.children}
    </div>
  );
}

export default DashboardLayout;
