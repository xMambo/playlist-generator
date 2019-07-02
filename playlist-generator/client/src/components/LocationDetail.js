import React, { Component } from "react";

export class LocationDetail extends Component {

  render() {
      return (
      <div>
        <p>{ this.props.city.cityState }</p>
        </div>
            )
        }
    }

export default LocationDetail;