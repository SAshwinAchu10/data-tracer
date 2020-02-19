"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var async = require("async");
var mongoose_1 = require("./audit/tracer/mongoose");
var _tracers = [];
var Audit = /** @class */ (function () {
    function Audit() {
    }
    Audit.prototype.addTracer = function (tracer, options) {
        options = options || {};
        // let myTrack = require('./audit/tracer/' + tracer);
        // var MongooseTracker = require(`./audit/tracer/${tracer}`)
        if (tracer) {
            _tracers.push(new mongoose_1.default(options));
        }
    };
    Audit.prototype.log = function (logData) {
        logData.logType || (logData.logType = 'GENERAL');
        return this.emitData(logData);
    };
    Audit.prototype.logEvent = function (severity, what, subject, status, who, where, why, type, meta) {
        var eventPackage = this.generalizeData(severity, what, subject, status, who, where, why, type, meta);
        return this.emitData(eventPackage);
    };
    Audit.prototype.emitData = function (dataObject) {
        console.log('_tracers', _tracers);
        async.forEach(_tracers, function (tracer, cb) {
            tracer.emit(dataObject);
            cb(null);
        }, function (err) {
            return true;
        });
    };
    Audit.prototype.generalizeData = function (severity, what, subject, status, who, where, why, type, meta) {
        return {
            what: what != undefined ? what : '-',
            where: where != undefined ? where : '-',
            why: why != undefined ? why : '-',
            who: who != undefined ? who : 'Anonymous User',
            subject: subject != undefined ? subject : '-',
            severity: severity != undefined ? severity : 'INFO',
            status: status != undefined ? status : 'UNKNOWN',
            type: type != undefined ? type : 'EVENT',
            meta: meta != undefined ? meta : {},
        };
    };
    return Audit;
}());
exports.default = new Audit();
