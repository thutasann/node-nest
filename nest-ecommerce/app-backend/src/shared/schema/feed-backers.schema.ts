import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * Feedbackers Document
 */
@Schema({ timestamps: true })
export class Feedbackers extends Document {
	@Prop({})
	customerId: string;

	@Prop({})
	customerName: string;

	@Prop({})
	rating: number;

	@Prop({})
	feedbackMessage: string;
}

/**
 * Feedback Schema
 */
export const FeedbackSchema = SchemaFactory.createForClass(Feedbackers);
