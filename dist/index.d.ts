declare class Audit {
    addTracer(tracer: any, options: any): void;
    log(logData: any): void;
    logEvent(severity: string, what: string, subject: string, status: string, who: string, where: string, why: string, type: string, meta: any): void;
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
