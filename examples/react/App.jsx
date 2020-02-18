import React from 'react';
let Audit = require('data-tracer');

class App extends React.Component {

    componentDidMount() {
        Audit.logEvent(
            'INFO',
            'Ping',
            'api was triggered',
            'Successful',
            undefined,
            'app.js',
            'to Check Server status',
            'Event',
            {}
        );
    }

    render() {
        return (
            <div>simon, helloworld!!!</div>
        );
    }
}

export default App;