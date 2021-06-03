"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: __dirname + '/./../../.env' }); //https://stackoverflow.com/questions/42335016/dotenv-file-is-not-loading-environment-variables
const mysql = require('mysql2');
const HttpException = require('../middlewear/helpers/HttpException.helpers');
/**
 * Different between createPool & createConnection is with connection,
 * you only have one connection last until you close it (or MYSQL does).
 * You can pass that connection around by reference and re-use it, or you
 * can close on demand.
 */
class DBConnection {
    constructor() {
        /**
         * Processes the SQL and row/col values
         * https://dev.to/juliest88/how-to-build-rest-api-with-nodejs-express-and-mysql-31jk
         * https://codeburst.io/node-js-mysql-and-promises-4c3be599909b
         */
        this.query = (sql, values) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const callback = (error, result) => {
                    if (error) {
                        reject(error);
                        return resolve(Error(error));
                    }
                    resolve(result);
                };
                //console.log('We have got a callback of ' + callback);
                // execute will internally call prepare and query
                //console.log('Our SQL is\n' + sql + '\nOur values are\n' +values);
                this.db.execute(sql, values, callback);
            }).catch((err) => {
                console.log('Fuck I got an error' + err);
                const mysqlErrorList = Object.keys(HttpStatusCodes);
                // convert mysql errors which in the mysqlErrorList list to http status code
                err.status = mysqlErrorList.includes(err.code) ? HttpException[err.code] : err.status;
                throw err;
            });
        });
        // @ts-ignore
        this.db = mysql.createPool({
            host: process.env.HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_DATABASE,
            connectionLimit: process.env.DB_CONNECTION_LIMIT
        });
        /**
         * A pool is a place where a connection gets stored, when a request comes in
         * you either get a connection that isn't being used or a new one. If at the
         * limit, it will wait for another connection to open. Pooled connections do
         * not need to be manually closed, they can remain open and be reused.
         */
        this.checkConnection();
    }
    checkConnection() {
        // @ts-ignore
        this.db.getConnection((err, connection) => {
            if (err) {
                if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                    console.error('Database connection was closed.');
                }
                if (err.code === 'ER_CON_COUNT_ERROR') {
                    console.error('Database has too many connections.');
                }
                if (err.code === 'ECONNREFUSED') {
                    console.error('Database connection was refused.');
                }
            }
            if (connection) {
                connection.release();
            }
        });
    }
}
// like ENUM
const HttpStatusCodes = Object.freeze({
    ER_TRUNCATED_WRONG_VALUE_FOR_FIELD: 422,
    ER_DUP_ENTRY: 409
});
// removed .query from class
module.exports = new DBConnection().query;
