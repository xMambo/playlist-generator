import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Input extends Component {
state = {
    title: '',
    cityState: ''
}

onSubmit = (e) => {
    e.preventDefault();
    this.props.addInput(this.state.title);
    this.setState({ cityState: this.state.title});
    this.setState({ title: ""})
}
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  render() {

    return (
      <form onSubmit={this.onSubmit} style={{ display: 'flex' }}>
        <input 
          type="text" 
          name="title" 
          style={{ flex: '10', padding: '5px' }}
          placeholder="city,state" 
          value={this.state.title}
          onChange={this.onChange}
          />
        <input 
          type="submit" 
          value="Submit" 
          className="btn"
          onSubmit={this.onSubmit}
          style={{flex: '1'}}
        />
      </form>
    )
  }
}

// PropTypes
Input.propTypes = {
}

export default Input