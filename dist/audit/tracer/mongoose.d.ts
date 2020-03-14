/**
 *
 */
declare class MongooseTracker {
    model: any;
    _connection: any;
    options: any;
    _options: {
        collectionName: string;
        connectionString: string;
        appName: string;
    };
    constructor(options: any);
    /**
     *
     * @param dataObject
     */
    emit(dataObject: any): void;
    executeAggreagteQuery(query: any): Promise<any>;
    executeResolveQuery(id: string): Promise<any>;
}
export default MongooseTracker;
