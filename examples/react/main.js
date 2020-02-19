import React from 'react';
import ReactDOM from 'react-dom';

import App from './App.jsx';
import Audit from 'data-tracer';

Audit.addTracer('mongoose', { connectionString: 'mongodb://localhost:27017/db' })

ReactDOM.render(<App />, document.getElementById('app'));