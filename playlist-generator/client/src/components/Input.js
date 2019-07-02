import React, { Component } from "react";



class Input extends Component {
    

        state = {
            cityState: 'nashville,tennessee',
        };

    updateLocation(event) {
        this.setState({
            value: this.state.value,
        });
    }
    render() {
        console.log("value from input.js" ,this.state.cityState)

      return (
        <div className="input-group">
            <div>inputValue: {this.state.value}</div>
            <hr/>
            <div>cityState= {this.state.cityState}</div>
        <hr/>
                <div><label for="location">Location: </label>

                <div className="form-group">
                    <input className="input-field" type="text" defaultValue='nashville,tennessee' value={this.state.value}
                    onChange= {e => this.setState({value: e.target.value})}/>
                    <button onclick={this.updateLocation.bind(this)} >Submit</button>
            </div>
            </div>
        </div>
      )
    }
}
  export default Input;