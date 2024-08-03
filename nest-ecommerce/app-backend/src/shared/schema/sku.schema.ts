import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * Sku (Stock-keeping unit) Document
 */
@Schema({ timestamps: true })
export class SkuDetails extends Document {
	@Prop({})
	skuName: string;

	@Prop({})
	price: number;

	@Prop({})
	validity: number; // in days

	@Prop({})
	lifetime: boolean;

	@Prop({})
	stripePriceId: string;

	@Prop({})
	skuCode?: string;
}

/**
 * Sku Details Schema
 */
export const SkuDetailsSchema = SchemaFactory.createForClass(SkuDetails);
