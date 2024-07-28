/**
 * User Creaeted Event for `Evemt & Tasks Scheduling`
 */
export class UserCreatedEvent {
	constructor(
		public readonly userId: string,
		public readonly email: string,
	) {}
}
