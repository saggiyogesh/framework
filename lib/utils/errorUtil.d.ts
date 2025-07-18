export declare class AppError extends Error {
    status: number;
    payload: Record<string, any>;
    constructor(message: string, name?: string);
}
export declare function throwError(message: string, status?: number, payload?: Record<string, any>, name?: string): void;
export declare function throwValidationError(message: string, payload?: Record<string, any>): void;
export declare function throwForbiddenError(message: string, payload?: Record<string, any>): void;
