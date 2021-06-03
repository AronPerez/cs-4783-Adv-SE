"use strict";
const Joi = require('joi'); // https://joi.dev/api/?v=17.3.0
const authSchema = Joi.object({
    address: Joi.string().min(1).max(255).required(),
    city: Joi.string().min(1).max(50).required(),
    state: Joi.string().min(2).max(2).required(),
    zip: Joi.string().min(5).max(10).required()
});
const number = Joi.number().integer().required();
/**
 *
 * @type {{authSchema: Joi.ObjectSchema<any>}}
 * May need to add
 * https://www.digitalocean.com/community/tutorials/how-to-use-joi-for-node-api-schema-validation
 */
module.exports = {
    authSchema,
    number,
};
