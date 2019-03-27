import React, { Component } from "react";

class Graph extends Component {
  //THIS CODE ONLY WORKS IF THEY HAVE LOST NAY WEIGHT, CANT DIVIDE BY OR WITH 0
  convertPlot = (wtNow, goalWt, wtStart) => {
    return (wtNow - goalWt) * (270 / (wtStart - goalWt)) + 10;
  };

  componentDidMount() {
    let graph = document.getElementById("myCanvas");
    let ctx = graph.getContext("2d");
    let graphPlotxArr = [10, 55, 100, 145, 190, 235, 280];
    let graphPlotyArr = [...graphPlotxArr].reverse();
    ctx.beginPath();
    ctx.moveTo(10, 280);
    ctx.lineTo(280, 10);
    ctx.strokeStyle = "black";
    ctx.lineWidth = "2";
    /* TEXT ADD */
    ctx.font = "bold 25px 'Rubik'";
    ctx.fillStyle = "rgb(40,167,69)";
    ctx.textAlign = "center";
    ctx.fillText(JSON.parse(localStorage.getItem("goalWeight")), 250, 20);
    ctx.stroke();

    for (var x = 0; x < 7; x++) {
      let z = graphPlotxArr[x];
      let w = graphPlotyArr[x];
      ctx.beginPath();
      ctx.lineWidth = "7";
      ctx.strokeStyle = "lightskyblue";
      ctx.lineCap = "round";
      if (x === 6 || x === 0) {
        ctx.moveTo(z, w);
        ctx.lineTo(z, w);
        ctx.strokeStyle = "lightgreen";
      } else {
        ctx.moveTo(z - 1, w - 1);
        ctx.lineTo(z, w);
      }
      ctx.stroke();
    }

    let weightWeekOne = JSON.parse(
      localStorage.getItem("weeklyWeightArray")
    )[0];
    console.log(weightWeekOne);
    let goalWeight = JSON.parse(localStorage.getItem("goalWeight"));
    console.log(goalWeight);
    let convertMeArray = [
      ...JSON.parse(localStorage.getItem("weeklyWeightArray"))
    ]; //here we create distinct array
    let convertedArray = convertMeArray.map(item => {
      return (item = this.convertPlot(item, goalWeight, weightWeekOne));
    }, this);

    console.log((10 - 5) * (270 / (10 - 5)));
    console.log(convertedArray);
    for (x = 0; x < convertedArray.length; x++) {
      ctx.beginPath();
      ctx.lineWidth = "6";
      ctx.strokeStyle = "lightgreen";
      ctx.lineCap = "round";
      ctx.moveTo(graphPlotxArr[x], convertedArray[x]);
      ctx.lineTo(graphPlotxArr[x], convertedArray[x]);
      ctx.font = "bold 15px 'Rubik'";
      ctx.fillStyle = "rgb(220,53,69)";
      ctx.textAlign = "center";
      ctx.fillText(
        JSON.parse(localStorage.getItem("weeklyWeightArray"))[x],
        graphPlotxArr[x],
        convertedArray[x]
      );
      ctx.stroke();
    }
  }

  render() {
    let name = localStorage.getItem("name");
    let unit = localStorage.getItem("unit");
    return (
      <div className="centerGrid">
        <h2
          style={{
            height: "50px",
            border: "1.2px solid black",
            marginTop: "1px"
          }}
        >
          {" "}
          {name}{" "}
        </h2>
        <h4
          style={{ fontWeight: "bold", margin: "0 auto" }}
        >{`Goal Weight: ${JSON.parse(
          localStorage.getItem("goalWeight")
        )} ${unit}`}</h4>
        <canvas
          id="myCanvas"
          width="290px"
          height="290px"
          style={{ margin: "0 auto" }}
        />
        <button onClick={this.props.pageChanger} className="btn btn-info">
          Progress Page
        </button>
        <button
          onClick={this.props.resetClick}
          className="btn btn-danger btn-sm"
        >
          Reset Progress
        </button>
      </div>
    );
  }
}

export default Graph;
