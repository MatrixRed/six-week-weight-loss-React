import React, { Component } from "react";

class WeeklyGoal extends Component {
  render() {
    let { motivationArray } = this.props.state;
    let wk = parseFloat(this.props.week);
    let styleObj = {
      gridArea: this.props.pos
    };

    let personalGoal =
      JSON.parse(localStorage.getItem("planArray")) === null
        ? undefined
        : JSON.parse(localStorage.getItem("planArray"))[wk - 1];
    return (
      <div className="gridItem" style={styleObj}>
        <p style={{ backgroundColor: "black" }}> Week {wk} </p>
        <p>{personalGoal || motivationArray[wk - 1]}</p>
      </div>
    );
  }
}

export default WeeklyGoal;
