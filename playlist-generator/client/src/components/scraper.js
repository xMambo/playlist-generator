import React, { Component } from 'react';
import axios from 'axios';

class Scraper extends Component {
    constructor() {
        super();
        this.state = ({
            url: '',
            html: '',
        });
    }

render() {
    const search = (
        <div className='container'>
        <input type="text"
        className = 'form-control'
        value= {this.state.utl}
        onChange={this.setUrl.bind(this)}
        />
        <div className='input-group-append'>
        <button className='btn btn-outline-secondary'
        type='button'
        id='button-addon2'
        onClick={this.sendUrl.bind(this)}
        >
        Scrape
        </button>
        </div>
        <div>
        <textarea className='result' rows='15' cols='120' value={this.state.html}></textarea>
        </div>
        </div>
        
    );
    return (
        <div>
            {search}
        </div>
    );
}

setUrl(evt){
    this.setState({
      ...this.state,
      url: evt.target.value
    });

  }

  sendUrl(){


  axios.get('https://allthatsinteresting.com/tag/science', {
    params: {url: this.state.url}})
  .then( (response) => {
    this.setState({
      ...this.state,
      html: response.data

    });
  });
}  
}

export default Scraper