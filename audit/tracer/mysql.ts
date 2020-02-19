import * as typeorm from 'typeorm';
import { getConnection } from 'typeorm'
import Audit from './entity/Audit'

/**
 *
 */
export default class MySQLTracker {

    constructor(options: any) {
        typeorm.createConnection({
            type: "mysql",
            host: options.host,
            port: 3306,
            username: options.user,
            password: options.password,
            database: options.database,
            synchronize: true,
            entities: [
                Audit
            ]
        }).then(function (connection: any) {
        }).catch(function (error: any) {
            console.log("Error: ", error);
        });
    }

    emit(dataObject) {
        if (dataObject) {
            getConnection().manager.query('insert into audits set ?', dataObject)
                .then((results) => {
                    console.log("reesss", results)
                })
        }
    }
}