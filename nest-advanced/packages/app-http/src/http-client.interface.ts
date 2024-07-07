import { ModuleMetadata, Type } from '@nestjs/common';

/**
 * Http Client Module Options Interface
 */
export interface HttpClientModuleOptions {
	apiKey: string;
	apiUrl: string;
}

/**
 * Http Client Module Factory
 */
export interface HttpClientModuleFactory {
	createHttpModuleOptions: () =>
		| Promise<HttpClientModuleOptions>
		| HttpClientModuleOptions;
}

/**
 * Http client Module Async options that includes [inject, useClass, useExisting, useFactory]
 */
export interface HttpClientModuleAsyncOptions
	extends Pick<ModuleMetadata, 'imports'> {
	inject?: any[];
	useClass?: Type<HttpClientModuleFactory>;
	useExisting?: Type<HttpClientModuleFactory>;
	useFactory?: (
		...args: any[]
	) => Promise<HttpClientModuleOptions> | HttpClientModuleOptions;
}
