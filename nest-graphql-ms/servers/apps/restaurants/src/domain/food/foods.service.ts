import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../../../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { EmailService } from '../../email/email.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CreateFoodDto, DeleteFoodDto } from '../../core/dto/foods.dto';
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

	/** get foods from loggedin restaurant */
	async getFoodsByRestaurant(req: any, res: Response) {
		const restaurantId: string = req.restaurant?.id;

		const foods = await this.prisma.foods.findMany({
			where: { restaurantId },
			include: {
				images: true,
				restaurant: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
		});

		return { foods };
	}

	/** delete food */
	async deleteFood(deleteFoodDto: DeleteFoodDto, req: any) {
		const restaurantId: string = req.restaurant?.id;

		const food = await this.prisma.foods.findUnique({
			where: {
				id: deleteFoodDto.id,
			},
			include: {
				restaurant: true,
				images: true,
			},
		});

		if (food.restaurant.id !== restaurantId) {
			throw Error('Only Restaurant owner can delete food!');
		}

		await this.prisma.images.deleteMany({
			where: {
				foodId: deleteFoodDto.id,
			},
		});

		await this.prisma.foods.delete({
			where: {
				id: deleteFoodDto.id,
			},
		});

		return { message: 'Food Deleted successfully!' };
	}
}
