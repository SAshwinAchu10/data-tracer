var audit = require('./index.js');


audit.default.addTracer('mongoose', { connectionString: 'mongodb://35.175.108.86:27017/lop' })