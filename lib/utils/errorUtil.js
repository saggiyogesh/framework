export class AppError extends Error {
    status;
    payload;
    constructor(message, name = 'AppError') {
        super(message);
        this.name = name;
        this.status = 400;
        this.payload = {};
    }
}
export function throwError(message, status = 400, payload, name) {
    const e = new AppError(message, name);
    e.message = message;
    e.status = status;
    if (payload) {
        e.payload = payload;
    }
    throw e;
}
export function throwValidationError(message, payload) {
    throwError(message, 400, payload, 'ValidationError');
}
export function throwForbiddenError(message, payload) {
    throwError(message, 403, payload, 'ForbiddenError');
}
