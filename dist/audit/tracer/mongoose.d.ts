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
    emit(dataObject: any): void;
}
export default MongooseTracker;
