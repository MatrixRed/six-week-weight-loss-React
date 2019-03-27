import React, { Component } from "react";
const Context = React.createContext();

const reducer = () => {
  //switch goes here
};
var week = "Week 1";
if (localStorage.WeekNum) {
  week = localStorage.WeekNum;
}
export class Provider extends Component {
  state = {
    essay: `${week} plan to work towards your goal weight. Check navigation bar for useful links. (Less than 100 characters)`,
    firstName: "",
    lastName: "",
    weight: 0,
    goalWeight: "goal after 6 weeks", //this can be moved to goalweight <InputGroup> component
    unit: "Use lbs", //this can be moved to the unit <InputGroup>
    weekNo: 0,
    entered: false
  };
  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
