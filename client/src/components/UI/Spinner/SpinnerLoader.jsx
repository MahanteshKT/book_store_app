import React from "react";
import ReactDOM from "react-dom";
import classes from "./SpinnerLoader.module.css";
const Backdrop = (props) => {
  return (
    <div className={classes.backdrop}>
      <ModelOverlay />
    </div>
  );
};
// import classes from "./Model.module.css";
const ModelOverlay = (props) => {
  return (
    <div className={classes.loading}>
      <div className={`${classes["load-single"]}`}></div>
      <div className={classes.before}></div>
      <div className={`${classes["load-single"]}`}></div>
      <div className={classes.before}></div>
      <div className={classes["load-single"]}></div>
      <div className={classes["load-text"]}>
        <div>Loading</div> <p>.</p>
        <p>.</p>
        <p>.</p>
      </div>
    </div>
  );
};
const PortalElement = document.getElementById("overlay");
function SpinnerLoader() {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(<Backdrop />, PortalElement)}
    </React.Fragment>
  );
}

export default SpinnerLoader;
