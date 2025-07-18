export class AppError extends Error {
	public status: number;
	public payload: Record<string, any>;

	constructor(message: string, name = 'AppError') {
		super(message);
		this.name = name;
		this.status = 400;
		this.payload = {};
	}
}

export function throwError(message: string, status = 400, payload?: Record<string, any>, name?: string) {
	const e = new AppError(message, name);
	e.message = message;
	e.status = status;
	if (payload) {
		e.payload = payload;
	}

	throw e;
}

export function throwValidationError(message: string, payload?: Record<string, any>) {
	throwError(message, 400, payload, 'ValidationError');
}

export function throwForbiddenError(message: string, payload?: Record<string, any>) {
	throwError(message, 403, payload, 'ForbiddenError');
}
