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
import { NavLink } from "react-router-dom";

function SideBar() {
  return (
    <Sidebar aria-label="Sidebar with content separator example">
      <Sidebar.Items>
        <div className=" flex flex-row gap-3  items-center justify-center">
          <img
            src=""
            alt="gfddgdf"
            className=" bg-slate-800 w-[2rem] h-[2rem] rounded-md object-cover"
          />
          <h2>Mahantesh K T</h2>
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
          <Sidebar.Item icon={HiArrowSmRight}>
            <NavLink to="/admin/sign-in">Sign In</NavLink>
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiTable}>
            <NavLink to="/admin/log-out">Log out</NavLink>
          </Sidebar.Item>
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
