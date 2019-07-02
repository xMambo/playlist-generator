import React, { Component } from "react";

class FetchLatLon extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
        }
        console.log("in fetchlatlon.js ",this.props.value)
    }


//https://api.openweathermap.org/data/2.5/weather?q=nashville,tennessee&units=imperial&appid=166a433c57516f51dfab1f7edaed8413



componentDidMount() {

    const APIKey = "166a433c57516f51dfab1f7edaed8413";
    const BASEURL = "https://api.openweathermap.org/data/2.5/weather?q=";
    //let location = {location};
    const UNITS = "&units=imperial&appid="

    const url = BASEURL+this.props.value+UNITS+APIKey;
   fetch(url)
   .then(res => res.json())
   // eslint-disable-next-line
   .then(data => {
       this.setState({
           isLoaded: true,
           items: data,
       })
       console.log(data);
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
                        { <li>
                            {this.state.value}
                        </li>
                        /*
                        <li>
                            {this.state.items.coord.lat}
                        </li>
                        <li>
                            {this.state.items.coord.lon}
                        </li> */}
                </ul>
            
            </div>
        );
    };
}
}

export default FetchLatLon;