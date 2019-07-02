import React, { Component } from "react";

class FetchLatLon extends Component {

    state = {
            items: [],
            isLoaded: false,
        }
    

//https://api.openweathermap.org/data/2.5/weather?q=nashville,tennessee&units=imperial&appid=166a433c57516f51dfab1f7edaed8413



render() {
    console.log("from fetchLatLon", this.props.location)

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
                        }
                        
                </ul>
            
            </div>
        );
    };
}
}

export default FetchLatLon;