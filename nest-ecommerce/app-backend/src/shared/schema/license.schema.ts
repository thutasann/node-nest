import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

/**
 * License Document
 */
@Schema({
	timestamps: {
		createdAt: 'createdAt',
		updatedAt: 'updatedAt',
	},
})
export class License extends Document {
	@Prop({
		required: true,
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Products',
	})
	product: string;

	@Prop({
		required: true,
		type: String,
	})
	productSku: string;

	@Prop({
		required: true,
		type: String,
	})
	licenseKey: string;

	@Prop({
		default: false,
		type: Boolean,
	})
	isSold: boolean;

	@Prop({
		default: '',
	})
	orderId: string;
}

/** License Schema */
export const LicenseSchema = SchemaFactory.createForClass(License);
