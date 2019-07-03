import React, { Component } from "react";

class NewFetch extends Component {

state = {
    location: [
      {
          cityState: [],
        }
      ]
    }
    state = {
        title: ''
    }
    
    onSubmit = (e) => {
        e.preventDefault();
        this.props.addInput(this.state.title);
        this.setState({ title: ''});
        console.log("new:", e.target.value)
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

  
  export default NewFetch;
