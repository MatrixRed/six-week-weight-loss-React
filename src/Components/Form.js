import React from "react";

function Form(props) {
  let p = props.state;
  return (
    <form
      onSubmit={props.handleSubmit}
      className="centerItems"
      style={{ border: "1px solid black" }}
    >
      <h2 style={{ border: "1.1px solid black" }}>6-Week Weight Loss</h2>
      <div className="form-group">
        <label htmlFor="firstName" style={{ fontWeight: "bold" }}>
          First Name
        </label>
        <input
          type="text"
          value={p.firstName}
          name="firstName"
          onChange={props.handleChange}
          className="form-control"
          id="firstName"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="lastName" style={{ fontWeight: "bold" }}>
          Last Name
        </label>
        <input
          type="text"
          value={p.lastName}
          name="lastName"
          onChange={props.handleChange}
          className="form-control"
          id="lastName"
          required
        />
      </div>
      <div className="form-group">
        <textarea
          className="form-control"
          value={p.essay}
          name="essay"
          maxLength="120"
          rows="5"
          cols="26"
          style={{
            resize: "none",
            textAlign: "center"
          }}
          onChange={props.handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="weight1" style={{ fontWeight: "bold" }}>
          Current Weight
        </label>
        <input
          id="weight1"
          type="text"
          value={p.weight}
          onChange={props.handleChange}
          name="weight"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="weight2" style={{ fontWeight: "bold" }}>
          Goal Weight
        </label>
        <input
          id="weight2"
          type="text"
          value={p.goalWeight}
          onChange={props.handleChange}
          name="goalWeight"
          className="form-control"
        />
        <br />
        <button
          type="button"
          className="btn btn-success btn-sm"
          value={p.unit}
          onClick={props.unitConverter}
          style={{ marginRight: "10px" }}
        >
          {p.unit}
        </button>
        <button className="btn btn-info btn-lg" style={{ marginRight: "10px" }}>
          {" "}
          Submit{" "}
        </button>
        <button onClick={props.resetClick} className="btn btn-danger btn-sm">
          Reset
        </button>
      </div>
    </form>
  );
}
export default Form;
