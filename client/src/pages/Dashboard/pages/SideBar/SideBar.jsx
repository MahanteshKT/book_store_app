"use client";
import React from "react";
import { Sidebar } from "flowbite-react";
import { BiBuoy } from "react-icons/bi";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { baseURL } from "../../../../services/fetch-apis";
import { userAction } from "../../../../store/user-slice/user-slice";
import { deletLocalStorage } from "../../../../services/localStorage";

function SideBar() {
  const { user, token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const LogoutHandler = (e) => {
    e.preventDefault();
    console.log("logout");
    dispatch(userAction.setLogout());
    deletLocalStorage();
    navigate("/login");
  };

  return (
    <Sidebar aria-label="Sidebar with content separator example">
      <Sidebar.Items>
        <div className=" flex flex-row gap-3  items-center justify-center">
          <img
            src={`${baseURL}/assets/${user?.picturePath}`}
            alt="gfddgdf"
            className=" bg-slate-800 w-[3rem] h-[3rem] rounded-md object-cover"
          />
          <h2>
            {user?.firstName} {user?.lastName}
          </h2>
        </div>

        <Sidebar.ItemGroup>
          <Sidebar.Item icon={HiChartPie}>
            <NavLink to="/admin">Dashboard</NavLink>
          </Sidebar.Item>
          <Sidebar.Item icon={HiViewBoards}>
            <NavLink to="/admin/upload-books">Upload Book</NavLink>
          </Sidebar.Item>
          <Sidebar.Item icon={HiInbox}>
            <NavLink to="/admin/manage-books">Manage Books</NavLink>
          </Sidebar.Item>
          <Sidebar.Item icon={HiUser}>
            <NavLink to="/admin/users">Users</NavLink>
          </Sidebar.Item>
          <Sidebar.Item icon={HiShoppingBag}>
            <NavLink to="/admin">Products</NavLink>
          </Sidebar.Item>
          {!token && (
            <Sidebar.Item icon={HiArrowSmRight}>
              <NavLink to="/login">Sign In</NavLink>
            </Sidebar.Item>
          )}
          {token && (
            <>
              <Sidebar.Item icon={HiTable}>
                <NavLink to="/">To Main Page</NavLink>
              </Sidebar.Item>

              <Sidebar.Item href="#" onClick={LogoutHandler} icon={HiTable}>
                Log out
              </Sidebar.Item>
            </>
          )}
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#" icon={HiChartPie}>
            Upgrade to Pro
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiViewBoards}>
            Documentation
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={BiBuoy}>
            Help
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default SideBar;
