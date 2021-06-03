"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // Default express details
const router = express_1.default.Router(); // This is the react router that lets me manage multiple files
router.get('/', (req, res, next) => {
    res.send([{
            message: 'hello yourself'
        }]);
});
module.exports = router; // This is what allows the router to work successfully
