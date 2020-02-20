"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var async = require("async");
var mongoose_1 = require("./audit/tracer/mongoose");
var mysql_1 = require("./audit/tracer/mysql");
var alert_1 = require("./audit/tracer/alert");
var _tracers = [];
var _notifiy = [];
var sendAlerts = false;
var Audits = /** @class */ (function () {
    function Audits() {
    }
    /**
     *
     * @param tracer
     * @param options
     */
    Audits.prototype.addTracer = function (tracer, options) {
        options = options || {};
        if (tracer == 'mongoose') {
            _tracers.push(new mongoose_1.default(options));
        }
        else if (tracer == 'mysql') {
            _tracers.push(new mysql_1.default(options));
        }
    };
    /**
     *
     * @param logData
     */
    Audits.prototype.log = function (logData) {
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
    Audits.prototype.logEvent = function (severity, what, subject, status, who, where, why, type, meta) {
        var eventPackage = this.generalizeData(severity, what, subject, status, who, where, why, type, meta);
        return this.emitData(eventPackage);
    };
    /**
     *
     * @param dataObject
     */
    Audits.prototype.emitData = function (dataObject) {
        async.forEach(_tracers, function (tracer, cb) {
            if (sendAlerts)
                DataTracer.emit(dataObject);
            tracer.emit(dataObject);
            cb(null);
        }, function (err) {
            return true;
        });
    };
    Audits.prototype.generalizeData = function (severity, what, subject, status, who, where, why, type, meta) {
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
    return Audits;
}());
var DataTracers = /** @class */ (function () {
    function DataTracers() {
    }
    DataTracers.prototype.configureAlert = function (options) {
        if (options) {
            sendAlerts = true;
            _notifiy.push(new alert_1.default(options));
        }
    };
    DataTracers.prototype.emit = function (dataObject) {
        async.forEach(_notifiy, function (_notifier, cb) {
            _notifier.emit(dataObject);
            cb(null);
        }, function (err) {
            return true;
        });
    };
    return DataTracers;
}());
var Audit = new Audits();
exports.Audit = Audit;
var DataTracer = new DataTracers();
exports.DataTracer = DataTracer;
