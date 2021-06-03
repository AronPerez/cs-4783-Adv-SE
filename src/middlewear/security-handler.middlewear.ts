import dotenv from 'dotenv'
dotenv.config({path:__dirname+'/./../../.env'});
const HttpException =  require('./helpers/HttpException.helpers');

const auth = () => {
    async function apiKeyHeader(req: any, res: any, next: any) {
        console.log(req.headers['api_key'])
        // Checks if our secret key is used
        if (req.headers['api_key'] === process.env.API_KEY) return next();
        // Else we error out with 401
        //res.send.status(401)
        return next(new HttpException(401, "API key is missing or invalid"));
    }
    return apiKeyHeader;
}

module.exports = auth;