const query = require('../db/db');
const { multipleColumnSet } = require('../middlewear/helpers/common.helpers')
import dotenv from 'dotenv'
dotenv.config({path:__dirname+'/./../../.env'});

class propertyModel {
    tableName = process.env.DB_TABLE;
    /**
     * https://www.technicalkeeda.com/nodejs-tutorials/nodejs-mysql-retrieve-last-inserted-id
     * @param address
     * @param city
     * @param state
     * @param zip
     * @returns {Promise<*>}
     */
    protected create = async({address, city, state, zip}: { address: string; city: string; state: string; zip: string}) => {
        const sql = `INSERT INTO ${this.tableName}
        (address, city, state, zip) VALUE (?,?,?,?)`;
        console.log('We are living at ' + address + ' '  + city + ' ' + state + ' ' + zip) // SELECT LAST_INSERT_ID()
        let result = await query(sql, [address, city, state, zip]);
        /**
         * We can determine the amount of rows that were impacted
         * let affectedRows;
         * affectedRows = result ? result.affectedRows : 0;
         */
        return result.insertId;
    };
    /**
     *
     * @param id
     * @returns {Promise<*>}
     */
    protected findOne = async (id: readonly [string]) => {
        const sql = `SELECT * FROM ${this.tableName} WHERE id = ?`;
        return await query(sql, [id]);
    };
    // https://stackoverflow.com/questions/39484123/how-to-update-multiple-columns-in-mysql-using-nodejs
    protected update = async({address, city, state, zip}: { address: string; city: string; state: string; zip: string}, id: readonly [string]) => {
        const { columnSet } = multipleColumnSet({object: {address, city, state, zip}})
        console.log(columnSet)
        const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE id = ?`;
        /**
         * We don't put address, city, state, zip into an array, since all
         * values all already being passed into an array, this can lead to
         * abstraction and query will be unable to parse the values
         */
        return await query(sql, [address, city, state, zip, id]);
    };
    /**
     *
     * @param id
     * @returns {Promise<*|number>}
     */
    protected delete = async(id: readonly [string]) => {
        const sql = `DELETE FROM ${this.tableName}
        WHERE id = ?`;
        const result = await query(sql, [id]);
        let affectedRows: any;
        affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    };
}
module.exports = new propertyModel;