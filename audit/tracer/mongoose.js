let mongoose = require('mongoose')
let Schema = mongoose.Schema;
let util = require('util');

/**
 * 
 */
MongooseTracker = function (options) {

    this._options = { collectionName: 'audit', connectionString: '' };
    this._connection;

    if (typeof options !== 'undefined') {
        for (let attr in options) {
            this._options[attr] = options[attr];
        }
    }

    this._connection = mongoose.createConnection(this._options.connectionString, function (err) {
        if (err) {
            console.error("Error in connection to database" + err);
        }
    });

    this.modelSchema = new Schema({
        what: { type: String },
        where: { type: String },
        why: { type: String },
        who: { type: String, default: 'Anonymous User' },
        subject: { type: String },
        severity: { type: String, default: 'INFO' },
        status: { type: String, default: 'UNKNOWN' },
        meta: { type: Object },
        createdAt: { type: String, default: new Date().toString() }
    });

    this.model = this._connection.model(this._options.collectionName, this.modelSchema);

    this.emit = function (dataObject) {
        console.error('emit: ' + util.inspect(dataObject));

        if (dataObject) {
            let newEvent = new this.model(dataObject);
            newEvent.save(function (err) {
                if (err) console.error('Error saving event to database: ' + err);
            });
        }
    }

    return this;
}

exports = module.exports = MongooseTracker;