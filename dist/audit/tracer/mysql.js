"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import * as typeorm from 'typeorm';
var typeorm_1 = require("typeorm");
var Audit_1 = require("./entity/Audit");
/**
 *
 */
var MySQLTracker = /** @class */ (function () {
    function MySQLTracker(options) {
        this._connection = typeorm_1.createConnection({
            type: "mysql",
            host: options.host,
            port: 3306,
            name: 'default',
            username: options.user,
            password: options.password,
            database: options.database,
            synchronize: true,
            entities: [
                Audit_1.default
            ]
        }).then(function (connection) {
            console.log("&&&&&&&&&&", connection);
            return connection;
            // this._connection = connection
        }).catch(function (error) {
            console.log("Error:------ ", error);
        });
    }
    MySQLTracker.prototype.emit = function (dataObject) {
        console.log("*********");
        if (dataObject) {
            typeorm_1.getConnection().manager.query('insert into audits set ?', dataObject)
                .then(function (results) {
                console.log("reesss", results);
            });
        }
    };
    return MySQLTracker;
}());
exports.default = MySQLTracker;
