"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var mongoose = require("mongoose");
var util = require("util");
/**
 *
 */
var MongooseTracker = /** @class */ (function () {
    function MongooseTracker(options) {
        this._options = { collectionName: 'audit', connectionString: '' };
        this.options = options;
        if (typeof options !== 'undefined') {
            for (var attr in options) {
                this._options[attr] = options[attr];
            }
        }
        var modelSchema = new mongoose_1.Schema({
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
        this._connection = mongoose.createConnection(this._options.connectionString);
        this.model = this._connection.model(this._options.collectionName, modelSchema);
    }
    /**
     *
     * @param dataObject
     */
    MongooseTracker.prototype.emit = function (dataObject) {
        console.error('emit: ' + util.inspect(dataObject));
        if (dataObject) {
            var newEvent = new this.model(dataObject);
            newEvent.save(function (err) {
                if (err)
                    console.error('Error saving event to database: ' + err);
            });
        }
    };
    return MongooseTracker;
}());
exports.default = MongooseTracker;
