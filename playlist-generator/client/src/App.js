import React, { Component } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import FetchBands from "./components/FetchBands";
import Input from "./components/Input";
import Location from "./components/Location";
import NewFetch from "./components/pages/NewFetch"
import uuid from 'uuid'

class App extends Component {
  state = {
    location: [
      {
        id: uuid.v4(),
        cityState: ['nashville,tennessee'],
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
  
      let url = BASEURL+this.state.location[0].cityState+UNITS+APIKey;
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
  
    };
// Add Input
    addInput = (title) => {
      const newInput = {
        id: uuid.v4(),
        cityState: title,
        addCity: function(city) {
          this.location.push(city)
        }
      }
    this.setState({ location: [...this.state.location, newInput] });
    
    }
  
  
    render() {
  
      var { isLoaded } = this.state;
      if (!isLoaded) {
          return <div>Loading...</div>
      }
      else {
          return (
            <Router>
              <div className="App">
              <Route exact path="/" render={props => (
                <React.Fragment>
                <div className="container">
                <button type="button" onClick={this.onClearArray}>
          Clear Array
        </button>
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
                        <Input addInput={this.addInput} />
                      </div>
                      <div>
                      <Location location={this.state.location} switchState={this.switchState} handleChange={this.handleChange} handleSubmit={this.handleSubmit} value={this.state.value}/>
                      </div>
                    </div>
                    </React.Fragment>
              )} />
              <Route path="/newfetch" component={NewFetch} />
              <div className="inputField">
                        
                      </div>
                  </div>
            </Router>
          );
      };
  }
}

export default App;