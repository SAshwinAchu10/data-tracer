import { Schema } from 'mongoose';
import * as mongoose from 'mongoose';

/**
 * 
 */
class MongooseTracker {

    model: any;
    _connection: any;
    options: any;
    _options = { collectionName: 'audit', connectionString: '', appName: 'DEFAULT' };

    constructor(options: any) {
        this.options = options;
        if (typeof options !== 'undefined') {
            for (let attr in options) {
                this._options[attr] = options[attr];
            }
        }

        let modelSchema: any = new Schema({
            what: { type: String },
            where: { type: String },
            why: { type: String },
            who: { type: String, default: 'Anonymous User' },
            subject: { type: String },
            is: { type: String },
            resolved: { type: Boolean, default: false },
            type: { type: String, default: 'INFO' },
            status: { type: String, default: 'UNKNOWN' },
            meta: { type: Object },
            when: { type: String, default: new Date().toString() },
            appName: { type: String, default: this._options.appName },
            createdAt: { type: Date, default: new Date() }
        });
        this._connection = mongoose.createConnection(this._options.connectionString)

        this.model = this._connection.model(this._options.collectionName, modelSchema);


    }

    /**
     * 
     * @param dataObject 
     */
    emit(dataObject: any) {
        if (dataObject) {
            let newEvent = new this.model(dataObject);
            newEvent.save(function (err: any) {
                if (err) console.error('Error saving event to database: ' + err);
            });
        }
    }

    async executeAggreagteQuery(query: any) {
        return this.model.aggregate(query).exec()
            .then(
                async (result: any): Promise<any> => {
                    return result;
                },
            )
            .catch((error: any): Promise<any> => error);
    }

    async executeResolveQuery(id: string) {
        return this.model.update({ _id: id }, { $set: { resolved: true } }).exec()
            .then(
                async (result: any): Promise<any> => {
                    return result;
                },
            )
            .catch((error: any): Promise<any> => error);
    }


}
export default MongooseTracker;