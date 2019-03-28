import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WeeklyGoal from "./Components/WeeklyGoal.js";
import Form from "./Components/Form.js";
import Navbar from "./Components/Navbar.js";
import Graph from "./Components/Graph.js";
import ProgressPage from "./Components/Progress/ProgressPage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      essay:
        "Write a plan here for week 1 to work towards your goal (Less than 120 characters) Check top links for tips and ideas!",
      firstName: "",
      lastName: "",
      weight: "Weight in kg",
      goalWeight: "Goal after 6 weeks",
      unit: "Use lbs",
      entered: false,
      isSmallNav: false,
      progressPage: false,
      motivationArray: [
        "If it doesn't challenge you, it doesn't change you",
        "Great things never come from comfort zones",
        "Suffer the pain of discipline, or suffer the pain of regret",
        "Look in the mirror, that's your competition",
        "Do something today that your future self will thank you for",
        "The pain you feel today will be the strength you feel tomorrow"
      ]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.unitConverter = this.unitConverter.bind(this);
    this.resetClick = this.resetClick.bind(this);
  }

  componentDidMount() {
    if (!localStorage.planArray) {
      localStorage.setItem("planArray", "[]");
    }
    window.addEventListener(
      "resize",
      () => {
        this.setState({
          isSmallNav: window.innerWidth < 712
        });
      },
      false
    );
    if (localStorage.weekMark !== undefined) {
      this.setState({ entered: true });
    }
  }
  unitConverter(e) {
    if (this.state.weight === "Weight in kg") {
      this.setState({ weight: "Weight in lbs" });
    }
    if (this.state.weight === "Weight in lbs") {
      this.setState({ weight: "Weight in kgs" });
    }
    let input = parseFloat(this.state.weight);
    let input2 = parseFloat(this.state.goalWeight);
    let key = Number.isNaN(input) ? 3 : 4;
    if (Number.isNaN(input) || Number.isNaN(input2)) {
      this.setState({
        [Object.keys(this.state)[key]]: "Enter valid number"
      });
      return;
    }
    let unitUsed = e.target.value;
    let unitVar = unitUsed === "Use kg" ? "Use lbs" : "Use kg";
    this.setState(prevState => {
      let changedResult;
      let changedResult2;
      if (unitUsed === "Use kg") {
        changedResult = parseFloat(prevState.weight) / 2.2046226218488;
        changedResult2 = parseFloat(prevState.goalWeight) / 2.2046226218488;
      } else {
        changedResult = parseFloat(prevState.weight) * 2.2046226218488;
        changedResult2 = parseFloat(prevState.goalWeight) * 2.2046226218488;
      }
      return {
        weight: Math.round(changedResult * 10) / 10,
        goalWeight: Math.round(changedResult2 * 10) / 10,
        unit: unitVar
      };
    });
    e.preventDefault();
  }
  handleSubmit(e) {
    console.log(this.state);
    let today = new Date();
    let date =
      '"' +
      today.getFullYear() +
      "/" +
      (today.getMonth() + 1) +
      "/" +
      today.getDate() +
      '"';
    let weightEntered = parseFloat(this.state.weight);
    let goalWeightEntered =
      parseFloat(this.state.goalWeight) ||
      JSON.parse(localStorage.getItem("goalWeight"));
    if (
      localStorage.weekMark === undefined &&
      weightEntered > goalWeightEntered &&
      (!isNaN(weightEntered) && !isNaN(goalWeightEntered))
    ) {
      let currentUnit = this.state.unit === "Use lbs" ? "kg" : "lbs";
      localStorage.setItem("unit", currentUnit);
    }
    if (
      (weightEntered > goalWeightEntered ||
        localStorage.weekMark !== undefined) &&
      (!isNaN(weightEntered) && !isNaN(goalWeightEntered))
    ) {
      this.setState({
        weight: Math.round(parseFloat(this.state.weight) * 10) / 10,
        goalWeight: Math.round(parseFloat(this.state.goalWeight) * 10) / 10,
        progressPage: false
      });
      if (localStorage.weekMark) {
        localStorage.weekMark++;
        let a = JSON.parse(localStorage.weeklyWeightArray);
        a.push(Math.round(this.state.weight * 10) / 10);
        localStorage.setItem("weeklyWeightArray", JSON.stringify(a));
        let convertMe = JSON.parse(localStorage.getItem("date"));
        convertMe.push(date);
        localStorage.setItem("date", JSON.stringify(convertMe));
        console.log(localStorage.date);
      } else {
        localStorage.setItem(
          "weeklyWeightArray",
          JSON.stringify([Math.round(this.state.weight * 10) / 10])
        );
        localStorage.setItem(
          "name",
          this.state.firstName + " " + this.state.lastName
        );
        localStorage.setItem("weekMark", 0);
        localStorage.setItem("goalWeight", this.state.goalWeight);
        localStorage.setItem("date", date);
        let parsedFirstDate = JSON.parse(localStorage.getItem("date"));
        let firstDateArray = [];
        firstDateArray.push(parsedFirstDate);
        localStorage.setItem("date", JSON.stringify(firstDateArray));
        localStorage.setItem("goalWeight", this.state.goalWeight);
      }
      if (this.state.weight <= JSON.parse(localStorage.getItem("goalWeight"))) {
        alert(
          "Congratulations! You have reached your Goal :) Hit the Reset button and make a new Goal!!!"
        );
      }
    } else {
      if (
        localStorage.weekMark === undefined &&
        parseFloat(this.state.weight) <= parseFloat(this.state.goalWeight)
      ) {
        alert("Goal Weight must be less than Current Weight");
      }
    }
    if (
      localStorage.weekMark !== undefined &&
      (!isNaN(weightEntered) && !isNaN(goalWeightEntered))
    ) {
      let a = JSON.parse(localStorage.planArray);
      a.push(this.state.essay);
      localStorage.setItem("planArray", JSON.stringify(a));
      this.setState({ entered: true });
    }
    e.preventDefault();
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  resetClick(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ entered: false });
    localStorage.clear();
    localStorage.setItem("planArray", "[]");
  }
  pageChanger = e => {
    e.preventDefault();
    this.setState(prevState => {
      return { progressPage: !prevState.progressPage };
    });
  };

  render() {
    let navClass = this.state.isSmallNav
      ? "navbar navbar-expand-lg"
      : "navbar navbar-expand-lg navbar-expand-sm";
    let weeklyStuff = (
      <div className="leftGrid">
        <WeeklyGoal state={this.state} week="1" pos="1/ 4/ 7/ 7" />
        <WeeklyGoal state={this.state} week="2" pos="5/ 1/ 11/ 4" />
        <WeeklyGoal state={this.state} week="3" pos="9/ 4/ 15/ 7" />
      </div>
    );
    let progressStuff = this.state.entered ? (
      this.state.progressPage ? (
        <div className="centerGrid">
          <ProgressPage
            state={this.state}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            resetClick={this.resetClick.bind(this)}
            pageChanger={this.pageChanger}
          />
        </div>
      ) : (
        <Graph
          state={this.state}
          resetClick={this.resetClick.bind(this)}
          pageChanger={this.pageChanger}
        />
      )
    ) : (
      <div className="centerGrid">
        <Form
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          unitConverter={this.unitConverter}
          state={this.state}
          resetClick={this.resetClick.bind(this)}
        />
      </div>
    );
    return (
      <div className="App">
        <React.Fragment>
          <Navbar navClass={navClass} />
          <div className="bodyGrid">
            {window.innerWidth < 712 ? progressStuff : weeklyStuff}
            {window.innerWidth < 712 ? weeklyStuff : progressStuff}
            <div className="rightGrid">
              <WeeklyGoal state={this.state} week="4" pos="1/ 1/ 7/ 4" />
              <WeeklyGoal state={this.state} week="5" pos="5/ 4/ 11/ 7" />
              <WeeklyGoal state={this.state} week="6" pos="9/ 1/ 15/ 4" />
            </div>
          </div>
        </React.Fragment>
      </div>
    );
  }
}

export default App;
