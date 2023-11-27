import React, { useEffect, useState } from "react";
import logo from "../../../assets/bookshelf.png";
import classes from "./Header.module.css";
import { NavLink, useNavigate } from "react-router-dom";
// import { FaBarsStaggered } from "react-icons";
import { RiMenu3Fill, RiCloseLine } from "react-icons/ri";
import Button from "../../UI/Button/Button";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../../../store/user-slice/user-slice";
import { deletLocalStorage } from "../../../services/localStorage";
import { uiAction } from "../../../store/ui-slice/ui-slice";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { TotalAmount, totalQuantity } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const [isMenuActive, setIsMenuActive] = useState(true);
  const [isSticky, setIsSticky] = useState(false);
  const [buttonAnimate, setButtonAnimate] = useState(false);
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
      // window.removeEventListener("click", clickHandler);
    };
  }, []);
  const navItems = [
    { to: "/", name: "HOME" },
    { to: "/shop", name: "shop" },
    { to: "/admin", name: "sell your book" },
    { to: "/about", name: "About" },
    { to: "/blog", name: "Blog" },
  ];

  const LogoutHandler = (e) => {
    e.preventDefault();
    console.log("logout");
    dispatch(userAction.setLogout());
    deletLocalStorage("user-slice");
    navigate("/login");
  };

  const cartHandler = (e) => {
    e.preventDefault();
    dispatch(uiAction.showCartHandler());
  };

  useEffect(() => {
    if (totalQuantity === 0) {
      return;
    }

    setButtonAnimate(true);
    const time = setTimeout(() => {
      setButtonAnimate(false);
    }, 300);
  }, [totalQuantity]);

  return (
    <div
      className={`${
        isSticky
          ? " bg-gradient-to-r from-orange-300 bg-opacity-60 to-white-300 backdrop-blur-md shadow-lg "
          : " bg-orange-100"
      }  ${classes.header}  relative overflow-visible `}
    >
      <NavLink to="/">
        <label className={`${classes.logo} cursor-pointer shadow-orange-400`}>
          <img src={logo} width={30} height={30} /> LibroVerse
        </label>
      </NavLink>

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
                    ? " text-blue-600 before:bg-red-400 font-bold before:w-full"
                    : ""
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
          {!isMenuActive &&
            (user?.token ? (
              <button
                className="cursor-pointer bg-orange-200 rounded-md p-1 hover:text-black hover:bg-orange-500"
                onClick={LogoutHandler}
              >
                Logout
              </button>
            ) : (
              <button
                className=" bg-orange-300"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/login");
                }}
              >
                Log In
              </button>
            ))}
        </ul>
      </nav>

      <div className="flex flex-row justify-center items-end md:items-center gap-5 w-[30%] ">
        <Button
          onClick={cartHandler}
          className={`hidden md:flex ${
            buttonAnimate && classes.bump
          } justify-center items-center gap-2 shadow-md shadow-orange-300 my-2`}
        >
          Your Cart <FaShoppingCart />{" "}
          <span className="px-[11px] py-[0px] bg-orange-200 shadow-sm text-[0.8rem] rounded-xl">
            {totalQuantity || 0}
          </span>
        </Button>
        {user.token && (
          <div className="hidden mx-[0.5rem]  md:mr-0  md:flex md:flex-col ">
            <select
              name=""
              id=""
              onChange={(e) => {
                if (e.target.value === "logout") {
                  LogoutHandler(e);
                }
              }}
              value={user.user.firstName}
              className="p-[0.5rem] hidden lg:block  shadow-md px-[1rem] text-[1rem] font-medium rounded-sm"
            >
              <option value="username" selected>
                <h5>{user.user.firstName}</h5>
              </option>
              <option className=" " value="logout">
                Logout
              </option>
            </select>
          </div>
        )}
      </div>

      <div className="flex gap-5 justify-center items-center font-bold text-[25px]">
        <div
          onClick={cartHandler}
          className={`${
            buttonAnimate && classes.bump
          } flex gap-1 font-bold items-center md:hidden w-min-[3rem] mr-[1rem]  text-orange-500 hover:text-black`}
        >
          <FaShoppingCart />
          <span className=" text-[1rem]">({totalQuantity})</span>
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
