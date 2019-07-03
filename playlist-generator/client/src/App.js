import React, { Component } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import FetchBands from "./components/FetchBands";
import Input from "./components/Input";
import Location from "./components/Location";
import NewFetch from "./components/pages/NewFetch"


class App extends Component {
  state = {
    location: [
      {
        cityState: ['nashville,tennessee'],
        items: [],
      }
    ]
  }

  componentDidMount () {

    this.fetchAPI(this.state.location[0].cityState)
  
  }

fetchAPI = () => {

      console.log("fetch:", this.state.location[0].cityState)
      const APIKey = "166a433c57516f51dfab1f7edaed8413";
      const BASEURL = "https://api.openweathermap.org/data/2.5/weather?q=";
      const UNITS = "&units=imperial&appid="
      const place = this.state.location[0].cityState
  
      let url = BASEURL+place+UNITS+APIKey;
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
  
// Add Input
    addInput = (title) => {
      const newInput = {
        cityState: title,
        
      }
    this.setState({ location: [newInput] });
    
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
                        <Input addInput={this.addInput} fetchAPI={this.fetchAPI}/>
                            <input 
                            type="submit" 
                            value="Generate" 
                            className="btn"
                            onClick={()=>this.fetchAPI()}
                            style={{flex: '1'}}
        />
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