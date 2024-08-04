import {
	IsArray,
	IsEnum,
	IsNotEmpty,
	IsOptional,
	IsString,
} from 'class-validator';
import {
	BaseType,
	CategoryType,
	PlatformType,
} from 'src/shared/data-types/products.type';
import { SkuDetails } from 'src/shared/schema/sku.schema';

export class CreateProductDto {
	@IsString()
	@IsNotEmpty()
	productName: string;

	@IsString()
	@IsNotEmpty()
	description: string;

	@IsOptional()
	image?: string;

	@IsOptional()
	imageDetails?: Record<string, any>;

	@IsString()
	@IsNotEmpty()
	@IsEnum(CategoryType)
	category: string;

	@IsString()
	@IsNotEmpty()
	@IsEnum(PlatformType)
	platformType: string;

	@IsString()
	@IsNotEmpty()
	@IsEnum(BaseType)
	baseType: string;

	@IsString()
	@IsNotEmpty()
	productUrl: string;

	@IsString()
	@IsNotEmpty()
	downloadUrl: string;

	@IsArray()
	@IsNotEmpty()
	requirementSpecification: Record<string, any>[];

	@IsArray()
	@IsNotEmpty()
	highlights: string[];

	@IsOptional()
	@IsArray()
	skuDetails: SkuDetails[];

	@IsOptional()
	stripeProductId?: string;
}
