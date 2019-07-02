import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

let location = {
    name: "nashville,tennessee"
}


ReactDOM.render(<App location={location}/>, document.getElementById('root'));
registerServiceWorker();