import 'reflect-metadata';
import * as async from 'async';
import MongooseTracker from './audit/tracer/mongoose'
import MySQLTracker from './audit/tracer/mysql'
import Alert from './audit/tracer/alert'

let _tracers: any = [];
let _notifiy: any = [];
let sendAlerts: boolean = false;
let _options = {}
let _tracer = undefined;

class Audits {

    /**
     * 
     * @param tracer 
     * @param options 
     */
    addTracer(tracer: any, options: any) {
        options = options || {};
        _options = options;
        _tracer = tracer;

        if (tracer == 'mongoose') {
            _tracers.push(new MongooseTracker(options));
        }
        else if (tracer == 'mysql') {
            _tracers.push(new MySQLTracker(options));
        }
    }

    async aggregate(query: any) {
        if (_tracer == 'mongoose') {
            let MT = new MongooseTracker(_options);
            return MT.executeAggreagteQuery(query).then((response: any) => response)
        } else {
            return { message: 'Support to MySQL is not supported yet' }
        }
    }

    async resolve(id: string) {
        if (_tracer == 'mongoose') {
            let MT = new MongooseTracker(_options);
            return MT.executeResolveQuery(id).then((response: any) => response)
        } else {
            return { message: 'Support to MySQL is not supported yet' }
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
    logEvent(type: string,
        what: string,
        subject: string,
        status: string,
        who: string,
        where: string,
        why: string,
        is: string,
        meta: any) {

        let eventPackage = this.generalizeData(type,
            what,
            subject,
            status,
            who,
            where,
            why,
            is,
            meta);

        return this.emitData(eventPackage);
    }

    /**
     * 
     * @param dataObject 
     */
    emitData(dataObject: any) {
        async.forEach(_tracers, function (tracer: any, cb: any) {
            if (sendAlerts) DataTracer.emit(dataObject);
            tracer.emit(dataObject);
            cb(null);
        }, function (err: any) {
            return true;
        });
    }

    generalizeData(type: string,
        what: string,
        subject: string,
        status: string,
        who: string,
        where: string,
        why: string,
        is: string,
        meta: any) {
        return {
            what: what != undefined ? what : '-',
            where: where != undefined ? where : '-',
            why: why != undefined ? why : '-',
            who: who != undefined ? who : 'Anonymous User',
            subject: subject != undefined ? subject : '-',
            type: type != undefined ? type : 'INFO',
            status: status != undefined ? status : 'UNKNOWN',
            is: is != undefined ? is : 'EVENT',
            meta: meta != undefined ? meta : {},
        };
    }

}

interface DataTracerOptions {
    apiKey: string,
    provider: string,
    type: string,
    severity: string,
    mailTo: string,
    from: string,
    subject: string
}

class DataTracers {

    configureAlert(options: DataTracerOptions) {
        if (options) {
            sendAlerts = true;
            _notifiy.push(new Alert(options))
        }
    }

    emit(dataObject: any) {
        async.forEach(_notifiy, function (_notifier: any, cb: any) {
            _notifier.emit(dataObject);
            cb(null);
        }, function (err: any) {
            return true;
        });
    }
}

let Audit = new Audits();
let DataTracer = new DataTracers();
export {
    Audit,
    DataTracer
}