import React, { Component } from 'react';
import LocationDetail from './LocationDetail';

class Location extends Component {
    render() {
        console.log("props:", this.props.location)
        return this.props.location.map((city) => (
            <LocationDetail key={city.id} city={city} />
            ));
    }
}

export default Location;