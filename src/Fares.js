import React from "react";
import Axios from "axios";
import services from "./services";
import Select from "react-select";
import model from "./model";

class Fares extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: "",
      sourceAirports: model.airports,
      destAirports: model.airports,
      source: { value: "", label: "" },
      destination: { value: "", label: "" },
      fare: 0
    };
  }

  componentDidMount() {
    services.fetchAirports(this);
    this.setState({ msg: "" });
  }

  fetchFares = () => {
    if (this.state.source && this.state.destination)
      services.fetchFares(this.state.source, this.state.destination, this);
  };

  changeSource = selectedOption => {
    this.setState({ source: selectedOption });
    console.log(`Option selected:`, selectedOption);
  };

  changeDestination = selectedOption => {
    this.setState({ destination: selectedOption });
    console.log(`Option selected:`, selectedOption);
  };

  render() {
    let { state } = this;
    let list = [];

    state.sourceAirports.map(function(row) {
      list.push(<ul>{row.label}</ul>);
    });
    return (
      <div>
        <h1>Select source and destination airport and fecth fare</h1>
        <div style={{ display: "inline", marginTop: 20 }}>
          <div style={{ width: 400, margin: "auto" }}>
            <label>Select Source Airport</label>
            <Select
              options={state.sourceAirports}
              value={state.source}
              onChange={this.changeSource}
            />
          </div>
          <div style={{ width: 400, margin: "auto" }}>
            <label>Select Destination Airport</label>
            <Select
              options={state.destAirports}
              value={state.destination}
              onChange={this.changeDestination}
            />
          </div>
        </div>

        <div>
          <input
            type="button"
            style={{ marginTop: 25 }}
            onClick={this.fetchFares}
            value="Fetch Fares"
            disabled={!(state.source.value && state.destination.value)}
          />
        </div>
        <br />
        <br />
        <div>{"Fare :" + state.fare}</div>
      </div>
    );
  }
}
export default Fares;
