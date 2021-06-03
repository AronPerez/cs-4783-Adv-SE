"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const express_1 = __importDefault(require("express")); // Default express details
const body_parser_1 = __importDefault(require("body-parser")); // Allows us to see the JSON data with router middle-wear
const dotenv_1 = __importDefault(require("dotenv"));
const app = express_1.default();
const https = require('https');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const errorMiddleware = require('./middlewear/error.middlewear');
const swaggerUi = require('swagger-ui-express'); // swagger shit
const swaggerDocument = require('../swagger.json'); // swagger shit
const helloRoute = require('./routes/hello.route');
const propertyRoute = require('./routes/properties.route');
// Init environment
dotenv_1.default.config();
// enabling cors for all requests by using cors middleware
app.use(cors());
// Enable pre-flight
app.options("*", cors());
// This is the swagger stuff that works on endpoint
app.use('/', swaggerUi.serve);
app.get('/', swaggerUi.setup(swaggerDocument));
// Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
app.use(body_parser_1.default.json()); // support json encoded bodies
app.use(body_parser_1.default.urlencoded({ extended: true })); // support encoded bodies
// Router
app.use('/hello', helloRoute);
app.use('/properties', propertyRoute);
// Swagger JSON
app.get('/swagger.json', (req, res) => {
    res.send(swaggerDocument);
});
// Error middleware
app.use(errorMiddleware);
// Follow https://www.youtube.com/watch?v=USrMdBF0zcg
const port = process.env.PORT || 8080;
const sslServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'ssl', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'ssl', 'cert.pem'))
}, app);
sslServer.listen(port, () => console.log(`Server listening on port ${port}`));
