import React from "react";
import classes from "./Button.module.css";
function Button(props) {
  return (
    <button
      className={`${props?.className && `${props.className}`}`}
      onClick={props.onClick && props.onClick}
    >
      {props.children}
    </button>
  );
}

export default Button;
