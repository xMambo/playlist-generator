import React, { Component } from "react";


class FetchBands extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
        }
    }


//https://api.openweathermap.org/data/2.5/weather?q=nashville,tennessee&units=imperial&appid=166a433c57516f51dfab1f7edaed8413

componentDidMount() {
  
    fetch(`/bands`)
   .then(res => res.json())
   // eslint-disable-next-line
   .then(data => {
       this.setState({
           isLoaded: true,
           items: data,
       })
       
       console.log("data from /bands:" , data);
   });

  }


render() {
    var { isLoaded } = this.state;
    if (!isLoaded) {
        return <div>Loading...</div>
    }
    else {
        return (
            <ul>{this.state.items.map((item, index) => 
                <li key={index}>{item.bandName}</li>)}</ul>
        );
    };
}
}

export default FetchBands;