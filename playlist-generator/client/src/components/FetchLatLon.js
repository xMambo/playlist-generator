import React, { Component } from "react";

class FetchLatLon extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
        }
    }


//https://api.openweathermap.org/data/2.5/weather?q=nashville,tennessee&units=imperial&appid=166a433c57516f51dfab1f7edaed8413

componentDidMount() {
    const APIKey = "166a433c57516f51dfab1f7edaed8413";
    const BASEURL = "https://api.openweathermap.org/data/2.5/weather?q=";
    let location = "nashville,tennessee";
    const UNITS = "&units=imperial&appid="
    const url = BASEURL+location+UNITS+APIKey;

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
    var { isLoaded, items } = this.state;

    if (!isLoaded) {
        return <div>Loading...</div>
    }

    else {
        return (
            <div className="fetchLatLon">
                <ul>
                        <li>
                            {this.state.items.coord.lat}
                        </li>
                        <li>
                            {this.state.items.coord.lon}
                        </li>
                </ul>
            </div>
        );
    };
}
}

export default FetchLatLon;