import React from "react";
import services from "./services";
class Analysis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      ok: 0,
      cErr: 0,
      sErr: 0
    };
  }

  componentDidMount() {
    services.fetchMetrics(this);
  }

  render() {
    const state = this.state;
    return (
      <div style={{ marginTop: 20 }}>
        <div>
          <span>Total No of requests processed : </span>
          <span>{state.total}</span>
        </div>
        <div>
          <span>Total No of requests with OK response : </span>
          <span>{state.ok}</span>
        </div>
        <div>
          <span>Total No of requests with 4XX response : </span>
          <span>{state.cErr}</span>
        </div>
        <div>
          <span>Total No of requests with 5XX response : </span>
          <span>{state.sErr}</span>
        </div>
      </div>
    );
  }
}
export default Analysis;
