import { FactoryProvider } from '@nestjs/common/interfaces/modules/provider.interface';
import { ModuleMetadata } from '@nestjs/common';

/**
 * Email Config Options Constant for Provider
 */
export const EMAIL_CONFIG_OPTIONS = 'EMAIL_CONFIG_OPTIONS';

/**
 * Email Options
 */
export interface EmailOptions {
	service: string;
	user: string;
	pass: string;
}

/**
 * Email Async Options
 */
export type EmailAsyncOptions = Pick<ModuleMetadata, 'imports'> &
	Pick<FactoryProvider<EmailOptions>, 'useFactory' | 'inject'>;
