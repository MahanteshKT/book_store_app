import React, { useContext } from "react";
import ReactDOM from "react-dom";
import classes from "./Model.module.css";
import { useDispatch } from "react-redux";
import { cartAction } from "../../../store/cart-slice/cart-slice";
import { uiAction } from "../../../store/ui-slice/ui-slice";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClick} />;
};

const ModelOverlay = (props) => {
  return <div className={classes.modal}>{props.children}</div>;
};

const PortalElement = document.getElementById("new-overlay");

const Model = (props) => {
  const dispatch = useDispatch();
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop
          onClick={(e) => {
            e.preventDefault();
            dispatch(uiAction.showCartHandler());
          }}
        />,
        PortalElement
      )}
      {ReactDOM.createPortal(
        <ModelOverlay
          onClick={(e) => {
            e.preventDefault();
            dispatch(uiAction.showCartHandler());
          }}
        >
          {props.children}
        </ModelOverlay>,
        PortalElement
      )}
    </React.Fragment>
  );
};

export default Model;
