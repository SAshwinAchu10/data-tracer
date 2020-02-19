import { Schema } from 'mongoose';
import * as mongoose from 'mongoose';
import * as util from 'util';




/**
 * 
 */
class MongooseTracker {

    model: any;
    _connection: any;
    options: any;
    _options = { collectionName: 'audit', connectionString: '' };

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
            severity: { type: String, default: 'INFO' },
            status: { type: String, default: 'UNKNOWN' },
            meta: { type: Object },
            createdAt: { type: String, default: new Date().toString() }
        });
        this._connection = mongoose.createConnection(this._options.connectionString)

        this.model = this._connection.model(this._options.collectionName, modelSchema);


    }




    emit(dataObject: any) {
        console.error('emit: ' + util.inspect(dataObject));

        if (dataObject) {
            let newEvent = new this.model(dataObject);
            newEvent.save(function (err: any) {
                if (err) console.error('Error saving event to database: ' + err);
            });
        }
    }

}
export default MongooseTracker;