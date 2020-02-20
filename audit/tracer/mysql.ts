import { getConnection, createConnection } from 'typeorm'
import Audit from './entity/Audit'

/**
 *
 */
export default class MySQLTracker {

    _connection: any;

    constructor(options: any) {

     this._connection = createConnection({
            type: "mysql",
            host: options.host,
            port: 3306,
            name: 'default',
            username: options.user,
            password: options.password,
            database: options.database,
            synchronize: true,
            entities: [
                Audit
            ]
        }).then(function (connection: any) {
            return connection;
        }).catch(function (error: any) {
            console.log("Error:------ ", error);
        });
    }

    emit(dataObject: any) {
        if (dataObject) {
            getConnection().manager.query('insert into audits set ?', dataObject)
                .then((results: any) => {
                    console.log("reesss", results)
                })
        }
    }
}