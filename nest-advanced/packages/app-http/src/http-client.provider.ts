import { Provider } from '@nestjs/common';
import { HttpClientModuleOptions } from './http-client.interface';
import { HttpClientService } from './http-client.service';
import { HTTP_CLIENT_TOKEN } from './http-client.constants';

/**
 * get http client module options
 * @param options - http client module options
 * @returns - http client service
 */
export const getHttpClientModuleOptions = (
	options: HttpClientModuleOptions,
): HttpClientService => {
	return new HttpClientService(options);
};

/**
 * create http client provider
 * @param options - http client module options
 * @returns - nestjs provider
 */
export const createHttpClientProivder = (
	options: HttpClientModuleOptions,
): Provider => {
	return {
		provide: HTTP_CLIENT_TOKEN,
		useValue: getHttpClientModuleOptions(options),
	};
};
