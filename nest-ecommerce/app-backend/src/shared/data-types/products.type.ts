import { Products } from '../schema/products.schema';

export enum CategoryType {
	operatingSystem = 'Operating System',
	applicationSoftware = 'Application Software',
}

export enum PlatformType {
	windows = 'Windows',
	mac = 'Mac',
	linux = 'Linux',
	android = 'Android',
	ios = 'iOS',
}

export enum BaseType {
	computer = 'Computer',
	mobile = 'Mobile',
}

export type GroupedProductsProps = {
	latestProducts: Products[];
	topRatedProducts: Products[];
};
