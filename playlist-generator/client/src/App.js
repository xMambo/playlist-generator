
import React, { Component } from "react";
import "./App.css";
import FetchLatLon from "./components/FetchLatLon";
import FetchBands from "./components/FetchBands";
import Input from "./components/Input";


class App extends Component {

  render() {
    console.log(this.state.cityState)
    return (
      <div className="App">
        <FetchLatLon />
        <FetchBands />
        <form>
          <Input />
        </form>
      </div>
    );
  }
}

export default App;