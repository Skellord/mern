import { StatusCodes, getReasonPhrase } from 'http-status-codes';

class ApiError {
    code: number;
    message: string;

    constructor(code: number, message: string) {
        this.code = code;
        this.message = message;
    }

    static badRequest(msg: string) {
        return new ApiError(StatusCodes.BAD_REQUEST, msg);
    }

    static internal(msg: string = getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)) {
        return new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, msg);
    }

    static notFound(msg: string = getReasonPhrase(StatusCodes.NOT_FOUND)) {
        return new ApiError(StatusCodes.NOT_FOUND, msg);
    }
}

export default ApiError;
