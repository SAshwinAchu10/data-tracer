import * as async from 'async';
import MongooseTracker from './audit/tracer/mongoose'

let _tracers: any = [];


class Audit {

    /**
     * 
     * @param tracer 
     * @param options 
     */
    addTracer(tracer: any, options: any) {
        options = options || {};

        if (tracer == 'mongoose') {
            _tracers.push(new MongooseTracker(options));
        }
    }


    /**
     * 
     * @param logData 
     */
    log(logData: any) {
        logData.logType || (logData.logType = 'GENERAL');

        return this.emitData(logData);
    }

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

    /**
     * 
     * @param dataObject 
     */
    emitData(dataObject: any) {
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