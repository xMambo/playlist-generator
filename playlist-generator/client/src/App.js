
import React, { Component } from "react";
import "./App.css";
import FetchLatLon from "./components/FetchLatLon";

class App extends Component {
  state = {
    visible: true
  };

  render() {
    return (
      <div className="App">
        <FetchLatLon />
      </div>
    );
  }
}

export default App;