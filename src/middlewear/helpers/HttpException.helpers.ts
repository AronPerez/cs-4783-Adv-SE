class HttpException extends Error {
    private status: any;
    private data: any;
    constructor(status: any, message: any, data: any) {
        super(message);
        this.status = status;
        this.message = message;
        this.data = data;
    }
}

module.exports = HttpException;