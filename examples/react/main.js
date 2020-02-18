import React from 'react';
import ReactDOM from 'react-dom';

import App from './App.jsx';
let Audit = require('data-tracer')

Audit.addTracer('mongoose', { connectionString: 'mongodb://localhost:27017/ashwin' })

ReactDOM.render(<App />, document.getElementById('app'));