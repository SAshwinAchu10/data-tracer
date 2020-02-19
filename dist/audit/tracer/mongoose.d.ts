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
    };
    constructor(options: any);
    /**
     *
     * @param dataObject
     */
    emit(dataObject: any): void;
}
export default MongooseTracker;
