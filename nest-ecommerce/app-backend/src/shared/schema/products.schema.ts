import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
	BaseType,
	CategoryType,
	PlatformType,
} from '../data-types/products.type';
import { Feedbackers, FeedbackSchema } from './feed-backers.schema';
import { SkuDetails, SkuDetailsSchema } from './sku.schema';
import { Document } from 'mongoose';

export const PRODUCT_PLACEHOLDER =
	'https://seetruetechnology.com/wp-content/uploads/2022/02/BG-7.jpg';

/**
 * Products Schema
 */
@Schema({ timestamps: true })
export class Products extends Document {
	@Prop({ required: true })
	productName: string;

	@Prop({ required: true })
	description: string;

	@Prop({ default: PRODUCT_PLACEHOLDER })
	image?: string;

	@Prop({
		required: true,
		enum: [CategoryType.applicationSoftware, CategoryType.operatingSystem],
	})
	category: string;

	@Prop({
		required: true,
		enum: [
			PlatformType.android,
			PlatformType.ios,
			PlatformType.linux,
			PlatformType.mac,
			PlatformType.windows,
		],
	})
	platformType: string;

	@Prop({ required: true, enum: [BaseType.computer, BaseType.mobile] })
	baseType: string;

	@Prop({ required: true })
	productUrl: string;

	@Prop({ required: true })
	downloadUrl: string;

	@Prop({})
	avgRating: number;

	@Prop([{ type: FeedbackSchema }])
	feedbackDetails: Feedbackers[];

	@Prop([{ type: SkuDetailsSchema }])
	skuDetails: SkuDetails[];

	@Prop({ type: Object })
	imageDetails: Record<string, any>;

	@Prop({})
	requirementSpecification: Record<string, any>[];

	@Prop({})
	highlights: string[];

	@Prop({})
	stripeProductId?: string;
}

export const ProductSchema = SchemaFactory.createForClass(Products);
