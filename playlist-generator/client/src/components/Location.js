import React, { Component } from 'react';
import LocationDetail from './LocationDetail';
import PropTypes from 'prop-types';

class Location extends Component {
    render() {
        console.log("props:", this.props.location)
        return this.props.location.map((city) => (
            <LocationDetail key={city.id} city={city} />
            ));
    }
}

//PropTypes
Location.propTypes = {
    location: PropTypes.array.isRequired
}

export default Location;