"use strict";
function errorMiddleware(error, req, res, next) {
    let { status = 500, message, data } = error;
    console.log(`[Error] ${error}`);
    // If status code is 500 - change the message to interal server error
    message = status === 500 || !message ? 'Internal server error' : message;
    error = Object.assign({ type: 'error', status,
        message }, (data) && data);
    res.status(status).send(error);
}
module.exports = errorMiddleware;
