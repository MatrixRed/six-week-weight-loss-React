import React from "react";

function Navbar(props) {
  let margin = props.navClass ? "-10px" : "0px";
  return (
    <div className={props.navClass} id="navigationBar">
      <ul className="navbar-nav">
        <li className="navbar-brand" style={{ marginBottom: margin }}>
          <a
            href="https://www.fitnessblender.com/"
            id="link1"
            className="btn btn-info"
          >
            Exercise
          </a>
        </li>
        <li className="navbar-brand" style={{ marginBottom: margin }}>
          <a
            href="https://blog.myfitnesspal.com/10-simple-and-realistic-ways-to-eat-healthier-in-2019/"
            id="link2"
            className="btn btn-info"
          >
            Nutrition
          </a>
        </li>
        <li className="navbar-brand">
          <a
            href="https://www.nzmuscle.co.nz/"
            id="link3"
            className="btn btn-info"
          >
            Supplements
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
