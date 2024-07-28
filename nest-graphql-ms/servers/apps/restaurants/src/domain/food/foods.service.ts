import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../../../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { EmailService } from '../../email/email.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CreateFoodDto } from '../../core/dto/foods.dto';
import type { Response } from 'express';
import { IFood, IImages } from '../../core/types/foods.type';

@Injectable()
export class FoodsService {
	private readonly logger = new Logger(FoodsService.name);

	constructor(
		private readonly prisma: PrismaService,
		private readonly configService: ConfigService,
		private readonly emailService: EmailService,
		private readonly cloudinaryService: CloudinaryService,
	) {}

	/** create food */
	async createFood(createFoodDto: CreateFoodDto, req: any, response: Response) {
		try {
			const { name, description, price, estimatedPrice, category, images } =
				createFoodDto as IFood;
			const restaurantId = req.restaurant?.id;
			this.logger.log(`restaurantId -> ${restaurantId}`);

			const foodImages: IImages[] = [];

			for (const image of images) {
				if (typeof image === 'string') {
					const data = await this.cloudinaryService.upload(image);
					foodImages.push({
						public_id: data.public_id,
						url: data.secure_url,
					});
				}
			}

			const foodData = {
				name,
				description,
				price,
				estimatedPrice,
				category,
				images: {
					create: foodImages.map(
						(image: { public_id: string; url: string }) => ({
							public_id: image.public_id,
							url: image.url,
						}),
					),
				},
				restaurantId,
			};

			await this.prisma.foods.create({
				data: foodData,
			});

			return { message: 'Food Created Successfully!' };
		} catch (error) {
			this.logger.error(`Food Create Error : ${error}`);
			return {
				message: error,
			};
		}
	}
}
