export class EventError extends Error {
	constructor(msg: string) {
		super(msg);

		// Set the prototype explicitly.
		Object.setPrototypeOf(this, EventError.prototype);
	}
}
