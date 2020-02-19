declare class Audits {
    /**
     *
     * @param tracer
     * @param options
     */
    addTracer(tracer: any, options: any): void;
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
    logEvent(severity: string, what: string, subject: string, status: string, who: string, where: string, why: string, type: string, meta: any): void;
    /**
     *
     * @param dataObject
     */
    emitData(dataObject: any): void;
    generalizeData(severity: string, what: string, subject: string, status: string, who: string, where: string, why: string, type: string, meta: any): {
        what: string;
        where: string;
        why: string;
        who: string;
        subject: string;
        severity: string;
        status: string;
        type: string;
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
declare const _default: {
    Audit: Audits;
    DataTracer: DataTracers;
};
export default _default;
