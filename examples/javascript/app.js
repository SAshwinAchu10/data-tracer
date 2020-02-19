let express = require('express');
let bodyParser = require('body-parser');
let datatracer = require('data-tracer')

let app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// initializing tracer
datatracer.default.Audit.addTracer('mongoose', { connectionString: 'mongodb://35.175.148.86:27017/as' })


datatracer.default.DataTracer.configureAlert({
    'apiKey': 'abcdefghijklmnopqrstuvwxyz',
    'provider': 'sendgrid',
    'subject': `Error from ${APP_NAME}`,
    'from': 'achu10@live.in',
    'mailTo': 'achu10@live.in',
    'type': ['SEVERE']
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.get('/ping', function (req, res) {

    Audit.default.logEvent(
        'INFO',
        'Ping',
        'api was triggered',
        'Successful',
        undefined,
        'app.js',
        'to Check Server status',
        'Event',
        {}
    )
    res.json({ message: 'pong' })
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;