import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

/** User types enum */
export enum userTypes {
	ADMIN = 'admin',
	CUSTOMER = 'customer',
}

/**
 * User Document
 */
@Schema({
	timestamps: true,
})
export class Users extends Document {
	@Prop({ required: true })
	name: string;

	@Prop({ required: true })
	email: string;

	@Prop({ required: true })
	password: string;

	@Prop({ required: true, enum: [userTypes.ADMIN, userTypes.CUSTOMER] })
	type: string;

	@Prop({ default: false })
	isVerified: boolean;

	@Prop({ default: false })
	otp: string;

	@Prop({ default: null })
	otpExpiryTime: Date;
}

/**
 * User Schema
 */
export const UserSchema = SchemaFactory.createForClass(Users);
