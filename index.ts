import * as async from 'async';
import MongooseTracker from './audit/tracer/mongoose'

let _tracers: any = [];


class Audit {

    addTracer(tracer: any, options: any) {
        options = options || {};

        // let myTrack = require('./audit/tracer/' + tracer);
        // var MongooseTracker = require(`./audit/tracer/${tracer}`)
        if (tracer) {
            _tracers.push(new MongooseTracker(options));
        }
    }


    log(logData: any) {
        logData.logType || (logData.logType = 'GENERAL');

        return this.emitData(logData);
    }

    logEvent(severity: string,
        what: string,
        subject: string,
        status: string,
        who: string,
        where: string,
        why: string,
        type: string,
        meta: any) {

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

    emitData(dataObject: any) {
        console.log('_tracers', _tracers)
        async.forEach(_tracers, function (tracer: any, cb: any) {
            tracer.emit(dataObject);
            cb(null);
        }, function (err: any) {
            return true;
        });
    }

    generalizeData(severity: string,
        what: string,
        subject: string,
        status: string,
        who: string,
        where: string,
        why: string,
        type: string,
        meta: any) {
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


export default new Audit();