export class RefreshTokenError extends Error {
	constructor(msg: string) {
		super(msg);

		// Set the prototype explicitly.
		Object.setPrototypeOf(this, RefreshTokenError.prototype);
	}
}
