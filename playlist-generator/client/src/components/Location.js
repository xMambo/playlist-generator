import React, { Component } from 'react';
import LocationDetail from './LocationDetail';
import PropTypes from 'prop-types';

class Location extends Component {
   

    render() {
        console.log("props:", this.props.location)
        return this.props.location.map((city) => (
            <LocationDetail key={city.id} city={city} switchCity=
            {this.props.swithCity} switchState={this.props.switchCase}/>
            ));
    }
}

//PropTypes
Location.propTypes = {
    location: PropTypes.array.isRequired
}

export default Location;