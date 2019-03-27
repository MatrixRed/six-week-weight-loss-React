import React from "react";

function Dates(props) {
  let mapMe = JSON.parse(localStorage.getItem("date"));
  let keys = [0, 1, 2, 3, 4, 5];
  const dateArray1 = mapMe.map((item, index) => {
    if (index > 0) {
      item = item.slice(0, -1);
      item = item.slice(1);
    }
    if (index < 3) {
      return (
        <li
          key={keys[index]}
          className="list-group-item"
          style={{ fontSize: "0.6em", paddingLeft: "-5px" }}
        >
          {`Wk ${keys[index] + 1} - ${item} : ${JSON.parse(
            localStorage.getItem("weeklyWeightArray")
          )[index] + props.unit}`}
        </li>
      );
    }
  });
  const dateArray2 = mapMe.map((item, index) => {
    if (index > 0) {
      item = item.slice(0, -1);
      item = item.slice(1);
    }
    if (index >= 3 && index < 6) {
      return (
        <li
          key={keys[index]}
          className="list-group-item"
          style={{ fontSize: "0.6em" }}
        >
          {`Wk ${keys[index] + 1} - ${item} : ${JSON.parse(
            localStorage.getItem("weeklyWeightArray")
          )[index] + props.unit}`}
        </li>
      );
    }
  });
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        width: "90%"
      }}
    >
      <ul
        style={{
          gridArea: "1, 1, 2, 2"
        }}
      >
        {dateArray1}
      </ul>{" "}
      <ul style={{}}>{dateArray2}</ul>
    </div>
  );
}

export default Dates;
