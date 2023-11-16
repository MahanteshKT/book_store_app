import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

function Footer() {
  useEffect(() => {
    console.log("Footer");
  }, []);
  return (
    <div className="flex flex-col bg-slate-700 p-10">
      <div>
        <ul>
          <li>
            <NavLink>COMPANY</NavLink>
          </li>
          <li>
            <NavLink>About</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
