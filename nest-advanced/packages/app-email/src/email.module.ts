import { DynamicModule, Module } from '@nestjs/common';
import {
	EMAIL_CONFIG_OPTIONS,
	EmailAsyncOptions,
	EmailOptions,
} from './email.interface';
import { EmailService } from './email.service';

@Module({})
export class EmailModule {
	/**
	 * Email Module Register Method
	 * @param options - email options
	 * @returns dynamic module
	 */
	static register(options: EmailOptions): DynamicModule {
		return {
			module: EmailModule,
			providers: [
				{
					provide: EMAIL_CONFIG_OPTIONS,
					useValue: options,
				},
				EmailService,
			],
		};
	}

	/**
	 * Email Module Register Async Method
	 * @param options - email async options
	 * @returns dynamic module
	 */
	static registerAsync(options: EmailAsyncOptions): DynamicModule {
		return {
			module: EmailModule,
			imports: options.imports,
			providers: [
				{
					provide: EMAIL_CONFIG_OPTIONS,
					useFactory: options.useFactory,
					inject: options.inject,
				},
				EmailService,
			],
			exports: [EmailService],
		};
	}
}
