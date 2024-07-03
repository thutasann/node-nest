import type { DataSourceOptions } from 'typeorm';

/**
 * Databaes config
 */
export interface DbConfig {
	entities: DataSourceOptions['entities'];
}
