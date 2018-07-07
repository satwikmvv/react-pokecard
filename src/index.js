import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Links from './Links'; 
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Links />, document.getElementById('root'));
registerServiceWorker();
