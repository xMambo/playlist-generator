import React, { Component } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
//import FetchBands from "./components/FetchBands";
import Input from "./components/Input";
import Location from "./components/Location";
import BandScraper from "./components/BandScraper";
import FetchBands from "./components/FetchBands";



class App extends Component {
  state = {
    location: [
      {
        cityState: ['nashville,tennessee'],
        items: [],
        newLoc: [],
        bandData: [],
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
         console.log("bandData:", this.state.location)
     });
    }

  
// Add Input
    addInput = (title) => {
      const newInput = {
        cityState: title,
        
      }
    this.setState({ location: [newInput] });
    
    }

    componentWillUpdate(getId) {
      this.getId(this.state.location)
    }
      getId = () => {
          console.log("from getId()", this.state.isLoaded)
  
  
          var Spotify = require('node-spotify-api');
   
  var spotify = new Spotify({
    id: "294109e617d5473cb40ce9746101cbb2",
    secret: "19f4c0dd43ba4818ba3ee01b1c9f0bba"
  });
   
  spotify.search({
      type: "artist",
      query: 'Your Old Droog'
  }, function (err, data) {
      var ID = data.artists.items[0].id;
      if (err) {
          return console.log("Error occured: " + err);
      }
      {
          console.log("\n----------------------------------");
          console.log("Artist_id: " + ID)
          console.log("----------------------------------\n");
  
      }
  });
  
  
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

                      </div>
                      <div className="bandscraper">
                      <BandScraper />
                      </div>
                      <div className="inputField">
                        <Input addInput={this.addInput} fetchAPI={this.fetchAPI}/>
                            <input 
                            type="submit" 
                            value="Generate" 
                            className="btn"
                            onClick={()=>this.fetchAPI() + this.getBandData()}
                            style={{flex: '1'}}
        />
                      </div>
                      <div>
                      <Location location={this.state.location} switchState={this.switchState} handleChange={this.handleChange} handleSubmit={this.handleSubmit} value={this.state.value}/>
                      </div>
                      <FetchBands getId={this.getId}/>
                            <input 
                            type="submit" 
                            value="Get ID" 
                            className="btn"
                            onClick={()=>this.getId()}
                            style={{flex: '1'}}/>
                    </div>

                    <h3><Logger newLat={this.state.items.coord.lat} newLon={this.state.items.coord.lat}/></h3>
                    </React.Fragment>
              )} />

                        

                  </div>
            </Router>
          );
      };
  }
}

class Logger extends Component {

  componentWillReceiveProps(newProps){
    console.log("componentWillRecieveProps() is Triggered");
    console.log("new props:", newProps);

  }

  render(){
    return this.props.newLat
  }
}


export default App;