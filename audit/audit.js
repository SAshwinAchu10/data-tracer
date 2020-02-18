let async = require('async');
let util = require('util');


function AuditTracer() {
    this._tracers = [];

    this.addTracer = function (tracer, options) {
        options = options || {};

        let myTrack = require('./tracer/' + tracer);
        this._tracers.push(new myTrack(options));
    }


    this.log = function (logData) {
        logData.logType || (logData.logType = 'GENERAL');

        return this.emitData(logData);
    }

    this.logEvent = function (severity,
        what,
        subject,
        status,
        who,
        where,
        why,
        type,
        meta) {

        let eventPackage = this.generalizeData(severity,
            what,
            subject,
            status,
            who,
            where,
            why,
            type,
            meta);

        return this.emitData(eventPackage);
    }

    this.emitData = function (dataObject) {
        async.forEach(this._tracers, function (tracer, cb) {
            tracer.emit(dataObject);
            cb(null);
        }, function (err) {
            return true;
        });
    }


    this.generalizeData = function (severity,
        what,
        subject,
        status,
        who,
        where,
        why,
        type,
        meta) {
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
    }

}
exports = module.exports = new AuditTracer();