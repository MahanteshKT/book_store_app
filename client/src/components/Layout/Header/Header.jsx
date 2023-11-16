import React, { useEffect, useState } from "react";
import logo from "../../../assets/bookshelf.png";
import classes from "./Header.module.css";
import { NavLink } from "react-router-dom";
// import { FaBarsStaggered } from "react-icons";
import { RiMenu3Fill, RiCloseLine } from "react-icons/ri";
import Button from "../../UI/Button/Button";
import { FaShoppingCart } from "react-icons/fa";
function Header() {
  const [isMenuActive, setIsMenuActive] = useState(true);
  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const navItems = [
    { to: "/", name: "HOME" },
    { to: "/about", name: "About" },
    { to: "/shop", name: "shop" },
    { to: "/admin", name: "sell your book" },
    { to: "/blog", name: "Blog" },
  ];

  return (
    <div
      className={`${
        isSticky
          ? " bg-gradient-to-r from-orange-300 bg-opacity-60 to-white-300 backdrop-blur-md shadow-lg "
          : " bg-orange-100"
      }  ${classes.header}  relative overflow-visible `}
    >
      <label className={`${classes.logo}  shadow-orange-400`}>
        <img src={logo} width={30} height={30} /> Books
      </label>
      <nav
        className={` ${
          !isMenuActive
            ? "flex transition ease-in-out delay-150 duration-300"
            : "hidden"
        } md:flex`}
      >
        <ul
          className={`${classes.navLinks} ${
            !isMenuActive
              ? " absolute flex-col top-full right-0  bg-gradient-to-r from-orange-300 bg-opacity-40 to-orange-200 shadow-md shadow-orange-500 rounded-md backdrop-blur-sm py-2  mr-[2rem] min-h-[30vh]"
              : "top-[-10rem]"
          }`}
        >
          {navItems.map((link) => (
            <li className={`${!isMenuActive ? "my-1 pb-2 px-3" : ""}`}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  isActive
                    ? " text-blue-400 before:bg-red-400 before:w-full"
                    : ""
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
          {!isMenuActive && <button>Logout</button>}
        </ul>
      </nav>

      <div className="flex flex-row justify-center items-end md:items-center gap-5 w-[30%] ">
        <Button className="hidden md:flex justify-center items-center gap-2 shadow-md shadow-orange-300 my-2">
          Your Cart <FaShoppingCart /> (0)
        </Button>
        <div className="hidden mx-[0.5rem]  md:mr-0  md:flex md:flex-col ">
          <select
            name=""
            id=""
            className="p-[0.5rem] hidden lg:block  shadow-md px-[1rem] text-[1rem] font-medium rounded-sm"
          >
            <option>
              <h5>mahantesh</h5>
            </option>
            <option>Logout</option>
          </select>
        </div>
      </div>

      <div className="flex gap-5 justify-center items-center font-bold text-[25px]">
        <div className="flex font-bold items-center md:hidden w-[2rem] mr-[1rem]  text-orange-500 hover:text-black">
          <FaShoppingCart />
        </div>
        <div
          onClick={(e) => {
            e.preventDefault();
            setIsMenuActive((prev) => !prev);
          }}
          className="flex font-bold items-center md:hidden w-[2rem] mr-[1rem]"
        >
          {isMenuActive ? (
            <RiMenu3Fill
              className={`w-full h-full font-bold text-[25px] text-orange-500 hover:text-black`}
            />
          ) : (
            <RiCloseLine
              className={`w-full h-full font-bold text-[25px] text-orange-500 hover:text-black`}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
