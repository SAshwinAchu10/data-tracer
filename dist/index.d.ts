declare class Audit {
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
declare const _default: Audit;
export default _default;
