module.exports = class ErrorHandler extends Error {
    constructor(message, customCode, status, params = {}) {
        super(message);
        this.status = status;
        this.customCode = customCode;
        this.params = params;

        Error.captureStackTrace(this, this.constructor);
    }
};
