import React from "react";
import Home from "./HomePage";
import Fares from "./Fares";
import Analysis from "./Analysis";
import Airports from "./Airports";
import { BrowserRouter, NavLink, Route } from "react-router-dom";
const link = {
  margin: 10,
  border: "1px solid #cccc",
  /* background: #cccc; */
  borderRadius: 8,
  fontSize: 20,
  textDecoration: "none",
  fontWeight: 500
};
function Dashboard(props) {
  return (
    <div id="dashboard">
      <div className="menu">
        <NavLink exact to="/" style={link}>
          Home
        </NavLink>
        <NavLink exact to="/fares" style={link}>
          Fares
        </NavLink>
        <NavLink exact to="/analysis" style={link}>
          Metrics
        </NavLink>
        <NavLink exact to="/airports" style={link}>
          Airports
        </NavLink>
      </div>
      <div className="content">
        <Route exact path="/" component={Home} />
        <Route exact path="/fares" component={Fares} />
        <Route exact path="/analysis" component={Analysis} />
        <Route exact path="/airports" component={Airports} />
      </div>
    </div>
  );
}
export default Dashboard;
