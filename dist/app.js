var audit = require('./index')



audit.default.Audit.addTracer('mongoose', { connectionString: 'mongodb://35.175.148.86:27017/as' })


audit.default.DataTracer.configureAlert({
    'apiKey': 'abcdefghijklmnopqrstuvwxyz',
    'provider': 'sendgrid',
    'subject': 'Error',
    'from': 'achu10@live.in',
    'mailTo': 'achu10@Live.in',
    'type': ['SEVERE']
})


audit.default.Audit.logEvent('SEVERE')