import React, { Component } from "react";
import PropTypes from 'prop-types';

export class LocationDetail extends Component {

  render() {
      return (
      <div>
        <p>props: { this.props.city.cityState }</p>
        </div>
            )
        }
    }

    //PropTypes
Location.propTypes = {
    city: PropTypes.object.isRequired
}

export default LocationDetail;