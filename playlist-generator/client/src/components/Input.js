import React, { Component } from "react";



class Input extends Component {
   state={
       value: ''
   }

    updateLocation(event) {
        this.setState({
            value: this.props.value,
        });
    }
    render() {
        console.log("state prop from input.js")

      return (
        <div className="input-group">
        <h1>Location</h1>
            <div>inputValue: {this.state.value}</div>
            <hr/>
            <div>cityState= {this.props.location}</div>
        <hr/>
                <div><label for="location">Type: </label>

                <div className="form-group">
                    <input className="input-field" type="text" defaultValue="nashville,tennessee" value={this.state.value}
                    onChange= {e => this.setState({value: e.target.value})}/>
                    <button onclick={this.updateLocation.bind(this)} >Submit</button>
            </div>
            </div>
        </div>
      )
    }
}
  export default Input;

  