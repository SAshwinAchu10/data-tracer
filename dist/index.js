"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var async = require("async");
var mongoose_1 = require("./audit/tracer/mongoose");
var _tracers = [];
var Audit = /** @class */ (function () {
    function Audit() {
    }
    /**
     *
     * @param tracer
     * @param options
     */
    Audit.prototype.addTracer = function (tracer, options) {
        options = options || {};
        if (tracer == 'mongoose') {
            _tracers.push(new mongoose_1.default(options));
        }
    };
    /**
     *
     * @param logData
     */
    Audit.prototype.log = function (logData) {
        logData.logType || (logData.logType = 'GENERAL');
        return this.emitData(logData);
    };
    /**
     *
     * @param severity
     * @param what
     * @param subject
     * @param status
     * @param who
     * @param where
     * @param why
     * @param type
     * @param meta
     */
    Audit.prototype.logEvent = function (severity, what, subject, status, who, where, why, type, meta) {
        var eventPackage = this.generalizeData(severity, what, subject, status, who, where, why, type, meta);
        return this.emitData(eventPackage);
    };
    /**
     *
     * @param dataObject
     */
    Audit.prototype.emitData = function (dataObject) {
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
