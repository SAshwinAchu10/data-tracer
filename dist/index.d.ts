import 'reflect-metadata';
declare class Audits {
    /**
     *
     * @param tracer
     * @param options
     */
    addTracer(tracer: any, options: any): void;
    aggregate(query: any): Promise<any>;
    resolve(id: string): Promise<any>;
    /**
     *
     * @param logData
     */
    log(logData: any): void;
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
    logEvent(type: string, what: string, subject: string, status: string, who: string, where: string, why: string, is: string, meta: any): void;
    /**
     *
     * @param dataObject
     */
    emitData(dataObject: any): void;
    generalizeData(type: string, what: string, subject: string, status: string, who: string, where: string, why: string, is: string, meta: any): {
        what: string;
        where: string;
        why: string;
        who: string;
        subject: string;
        type: string;
        status: string;
        is: string;
        meta: any;
    };
}
interface DataTracerOptions {
    apiKey: string;
    provider: string;
    type: string;
    severity: string;
    mailTo: string;
    from: string;
    subject: string;
}
declare class DataTracers {
    configureAlert(options: DataTracerOptions): void;
    emit(dataObject: any): void;
}
declare let Audit: Audits;
declare let DataTracer: DataTracers;
export { Audit, DataTracer };
