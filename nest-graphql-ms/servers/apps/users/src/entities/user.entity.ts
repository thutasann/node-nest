import { Directive, Field, ObjectType } from '@nestjs/graphql';

/**
 * Avatars Entity
 */
@ObjectType()
@Directive('@key(fields:"id")')
export class Avatars {
	@Field()
	id: string;

	@Field()
	public_id: string;

	@Field()
	url: string;

	@Field()
	userId: string;
}

/**
 * User Entity
 */
@ObjectType()
export class User {
	@Field()
	id: string;

	@Field()
	name: string;

	@Field()
	email: string;

	@Field()
	password: string;

	@Field(() => Avatars, { nullable: true })
	avatar?: Avatars | null;

	@Field()
	role: string;

	@Field()
	createdAt: Date;

	@Field()
	updatedAt: Date;
}
