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
const HttpException = require('../middlewear/helpers/HttpException.helpers');
const { authSchema, number } = require('../middlewear/helpers/propertyValidation.helpers');
const propertyModel = require('../models/property.model');
const awaitHandlerFactory = require('../middlewear/awaitHandlerFactory.middlewear');
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
/**
 * Da controllah
 * CRUD
 * TODO
 * - [x] Fix JOI validation
 * https://dev.to/itnext/joi-awesome-code-validation-for-node-js-and-express-35pk
 * https://joi.dev/api/?v=17.3.0#anyvalidateasyncvalue-options
 * Needed to add await
 * - [ ] Setup API Auth
 * https://pusher.com/sessions/meetup/london-node-user-group/ive-got-swagger-have-you
 * 29:00-34:00
 */
class propertyController {
    /**
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    getProperty(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.send([
                {
                    id: '1',
                    address: '501 Test Ave.',
                    zip: '78222'
                },
                {
                    id: '2',
                    address: '124 Main Street',
                    zip: '78222'
                }
            ]);
        });
    }
    ;
    /**
     * Okay so async/await are like a combo deal. You use async within await functions as like a pause.
     * So with promises the way it works I believe that promises can resolve or reject. Resolve
     * means that you “promised” your program something and it was fulfilled. Or a rejection means it
     * went through that part of the program and the promise was not successfully fulfilled. In this
     * case the await allows the program to wait for the promise to resolve or reject before it
     * continues. It’s a JavaScript exclusive issue for the most part which is what makes it very weird.
     * Because JavaScript is synchronous it can cause some funky issues sometimes.
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    createProperty(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield authSchema.validateAsync(req.body, { abortEarly: false }); //.catch(onunhandledrejection) // abortEarly default is True
                console.log(result);
                const pong = yield propertyModel.create(result); // Contacts model creates
                res.status(200).send([{
                        message: 'added',
                        id: `${pong}`
                    }]);
            }
            catch (error) {
                console.log('I made it');
                let errorData = [];
                if (error.isJoi === true)
                    error.status = 400; //isJoi:true means some type of validation issue
                for (let i = 0; i <= error.details.length - 1; i++) {
                    console.log();
                    errorData.push({ message: error.details[i].message.replace(/['"]/g, '') });
                }
                res.status(error.status).json(errorData);
                //next(HttpException(400, 'Please fill out the form as requested'));
            }
        });
    }
    ;
    /**
     *
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    getPropertyById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Validate
                const query = yield number.validateAsync(req.query.PropertyID);
                console.log(query);
                const propId = yield propertyModel.findOne(query);
                console.log(propId);
                if (propId === undefined || propId.length == 0) {
                    throw new HttpException(404, 'ID not found');
                }
                // else return the value
                res.send(propId);
            }
            catch (error) {
                if (error.status == 404)
                    throw new HttpException(error.status, 'ID not found');
                if (error.isJoi === true)
                    error.status = 400;
                throw new HttpException(error.status, 'Bad Request'); //isJoi:true means some type of validation issue
                //res.status(error.status).json(error.message);
            }
        });
    }
    ;
    /**
     * All I need to do is find the id and use the verify schema
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    updatePropertyById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Validate PropertyID
                const query = yield number.validateAsync(req.query.PropertyID);
                // Query DB to see if PropertyID exists, will return an array with an object
                const propId = yield propertyModel.findOne(query);
                // If our array is empty, no ID was found then we 404
                if (propId.length == 0)
                    throw new HttpException(404, 'ID not found');
                // Validate
                const result = yield authSchema.validateAsync(req.body, { abortEarly: false }); // abortEarly default is True
                // Create
                yield propertyModel.update(result, query);
                res.send([{
                        message: "updated",
                        id: `${query}`
                    }]);
            }
            catch (error) {
                if (error.status == 404)
                    throw new HttpException(error.status, 'ID not found');
                let errorData = [];
                if (error.isJoi === true)
                    error.status = 400; //isJoi:true means some type of validation issue
                console.log("I'm here");
                for (let j = 0; j <= error.details.length - 1; j++) {
                    errorData.push({ message: error.details[j].message.replace(/['"]/g, '') });
                }
                res.status(error.status).json(errorData);
                //next(HttpException(400, 'Please fill out the form as requested'));
            }
        });
    }
    ;
    /**
     *
     * @param req
     * @param res
     */
    deleteByPropertyId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield number.validateAsync(req.query.PropertyID);
                const propId = yield propertyModel.delete(query);
                // Check if any rows were affected, if 0, throw 404 error
                if (propId == 0)
                    throw new HttpException(404, 'ID not found');
                res.send([{
                        message: 'deleted'
                    }]);
            }
            catch (error) {
                if (error.status == 404)
                    throw new HttpException(error.status, 'ID not found');
                if (error.isJoi === true)
                    error.status = 400;
                throw new HttpException(error.status, 'Bad Request'); //isJoi:true means some type of validation issue
            }
        });
    }
    ;
}
module.exports = new propertyController;
