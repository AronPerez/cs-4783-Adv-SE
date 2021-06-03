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
const query = require('../db/db');
const { multipleColumnSet } = require('../middlewear/helpers/common.helpers');
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: __dirname + '/./../../.env' });
class propertyModel {
    constructor() {
        this.tableName = process.env.DB_TABLE;
        /**
         * https://www.technicalkeeda.com/nodejs-tutorials/nodejs-mysql-retrieve-last-inserted-id
         * @param address
         * @param city
         * @param state
         * @param zip
         * @returns {Promise<*>}
         */
        this.create = ({ address, city, state, zip }) => __awaiter(this, void 0, void 0, function* () {
            const sql = `INSERT INTO ${this.tableName}
        (address, city, state, zip) VALUE (?,?,?,?)`;
            console.log('We are living at ' + address + ' ' + city + ' ' + state + ' ' + zip); // SELECT LAST_INSERT_ID()
            let result = yield query(sql, [address, city, state, zip]);
            /**
             * We can determine the amount of rows that were impacted
             * let affectedRows;
             * affectedRows = result ? result.affectedRows : 0;
             */
            return result.insertId;
        });
        /**
         *
         * @param id
         * @returns {Promise<*>}
         */
        this.findOne = (id) => __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT * FROM ${this.tableName} WHERE id = ?`;
            return yield query(sql, [id]);
        });
        // https://stackoverflow.com/questions/39484123/how-to-update-multiple-columns-in-mysql-using-nodejs
        this.update = ({ address, city, state, zip }, id) => __awaiter(this, void 0, void 0, function* () {
            const { columnSet } = multipleColumnSet({ object: { address, city, state, zip } });
            console.log(columnSet);
            const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE id = ?`;
            /**
             * We don't put address, city, state, zip into an array, since all
             * values all already being passed into an array, this can lead to
             * abstraction and query will be unable to parse the values
             */
            return yield query(sql, [address, city, state, zip, id]);
        });
        /**
         *
         * @param id
         * @returns {Promise<*|number>}
         */
        this.delete = (id) => __awaiter(this, void 0, void 0, function* () {
            const sql = `DELETE FROM ${this.tableName}
        WHERE id = ?`;
            const result = yield query(sql, [id]);
            let affectedRows;
            affectedRows = result ? result.affectedRows : 0;
            return affectedRows;
        });
    }
}
module.exports = new propertyModel;
