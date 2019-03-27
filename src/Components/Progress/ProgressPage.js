import React from "react";
import Dates from "./Dates.js";

function ProgressPage(props) {
  let p = props.state;
  let unit = localStorage.getItem("unit");
  let weekMark = JSON.parse(localStorage.getItem("weekMark"));
  let parsedWeightArray = JSON.parse(localStorage.getItem("weeklyWeightArray"));
  return (
    <form
      onSubmit={props.handleSubmit}
      className="centerItems"
      id="progGrid"
      style={{ border: "1px solid black" }}
    >
      <div className="form-group progGridItem">
        <h2 style={{ border: "1.1px solid black", marginBottom: "8px" }}>
          6-Week Weight Loss
        </h2>
        <label
          htmlFor="textGoal"
          style={{ fontWeight: "bold", fontSize: "1.5em", marginBottom: "8px" }}
        >
          This Week's Plan
        </label>
        <p
          className="form-control"
          id="textGoal"
          onChange={props.handleChange}
          style={{
            fontWeight: "bold",
            height: "180px",
            minHeight: "fit-content",
            fontSize: "1.3em",
            width: "80%",
            margin: "0 auto",
            border: "3px double gold"
          }}
        >
          {JSON.parse(localStorage.getItem("planArray"))[weekMark]}
        </p>
        <Dates unit={unit} />
        <button
          onClick={props.pageChanger}
          className="btn btn-info btn-md"
          style={{ marginTop: "5px", marginBottom: "5px" }}
        >
          Progress Chart
        </button>
      </div>
      <div className="form-group progGridItem">
        {parsedWeightArray.length > 6 ? (
          <div>
            <div className="congratulations">
              <h2
                style={{
                  width: "80%",
                  fontWeight: "bold",
                  border: "3px dashed gold",
                  marginTop: "5px"
                }}
              >
                CONGRATULATIONS
              </h2>
              <br />
              <p style={{ fontWeight: "bold" }}>
                You made it to the end of your 6 week program, well done on
                making it this far. Hit Reset to give yourself another challenge
                :)
              </p>
            </div>
            <br />
            <button
              onClick={props.resetClick}
              className="btn btn-danger btn-sm"
              style={{ marginRight: "7px" }}
            >
              Reset
            </button>
          </div>
        ) : (
          <div>
            <h4 style={{ fontWeight: "bold" }}>Next Phase</h4>
            <label htmlFor="weight1">
              <span style={{ fontWeight: "bold" }}>Current Weight</span> {unit}
            </label>
            <input
              id="weight1"
              type="text"
              value={p.weight}
              onChange={props.handleChange}
              name="weight"
              className="form-control"
              style={{ margin: "0 auto", width: "auto", marginBottom: "5px" }}
            />
            <textarea
              className="form-control"
              value={p.essay}
              name="essay"
              maxLength="120"
              rows="5"
              cols="26"
              style={{
                resize: "none",
                margin: "0 auto",
                width: "80%"
              }}
              onChange={props.handleChange}
              required
            />
            <button
              className="btn btn-info btn-md"
              style={{ marginRight: "10px" }}
            >
              {" "}
              Submit{" "}
            </button>
            <button
              onClick={props.resetClick}
              className="btn btn-danger btn-sm"
              style={{ marginRight: "7px" }}
            >
              Reset
            </button>
          </div>
        )}
      </div>
    </form>
  );
}
export default ProgressPage;
