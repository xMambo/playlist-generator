import React, { Component } from "react";
import FetchBands from "./components/FetchBands";
import Input from "./components/Input";
import Location from "./components/Location";

class App extends Component {
  state = {
    location: [
      {
      id: 1,
      cityState: ["nashville,tennessee"],
      items: [],
      isLoaded: false,  
      }
    ]
  }

    componentDidMount() {
      console.log("fetch:", this.state.location[0].cityState)
      const APIKey = "166a433c57516f51dfab1f7edaed8413";
      const BASEURL = "https://api.openweathermap.org/data/2.5/weather?q=";
      const UNITS = "&units=imperial&appid="
  
      const url = BASEURL+this.state.location[0].cityState+UNITS+APIKey;
     fetch(url)
     .then(res => res.json())
     // eslint-disable-next-line
     .then(data => {
         this.setState({
             isLoaded: true,
             items: data,
         })
         console.log("fetch url data:", data);
     });
  
    }

    render() {
  
      var { isLoaded } = this.state;
      if (!isLoaded) {
          return <div>Loading...</div>
      }
      else {
          return (
              <div className="fetchLatLon">
                  <ul>
                           <li>
                              {this.state.items.name}
                          </li>
                          <li>
                          {this.state.items.coord.lat}
                          </li>
                          <li>
                          {this.state.items.coord.lon}
                        </li>
                          
                          
                  </ul>
                          
          <div className="fetchBands">
          <FetchBands />
          </div>
          <div className="inputField">
          <Input />
          </div>
          <div className="test">
          </div>
          <Location location={this.state.location} />
          </div>
          );
      };
  }
}

export default App;