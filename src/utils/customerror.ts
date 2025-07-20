import { StatusCodes } from 'http-status-codes';
export abstract class CustomError extends Error {
    abstract statusCode: number;

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}

class BadRequestException extends CustomError {
    statusCode = StatusCodes.BAD_REQUEST;

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, BadRequestException.prototype);
    }
}

class NotFoundException extends CustomError {
    statusCode = StatusCodes.NOT_FOUND;

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, NotFoundException.prototype);
    }
}

class UnauthorizedException extends CustomError {
    statusCode = StatusCodes.UNAUTHORIZED;

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, UnauthorizedException.prototype);
    }
}

class ForbiddenException extends CustomError {
    statusCode = StatusCodes.FORBIDDEN;

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, ForbiddenException.prototype);
    }
}

class ConflictException extends CustomError {
    statusCode = StatusCodes.CONFLICT;

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, ConflictException.prototype);
    }
}

class InternalServerError extends CustomError {
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR;

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, InternalServerError.prototype);
    }
}

export {
    BadRequestException,
    NotFoundException,
    UnauthorizedException,
    ForbiddenException,
    ConflictException,
    InternalServerError,
};
