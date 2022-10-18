export class SubmitError extends Error {
	constructor(msg: string) {
		super(msg);

		// Set the prototype explicitly.
		Object.setPrototypeOf(this, SubmitError.prototype);
	}
}
