import * as winston from 'winston';
import { LogLevel } from './log-level';
import * as moment from 'moment';

export class MyLoggerService {
	private readonly logger: winston.Logger;

	constructor(private context: string) {
		this.logger = winston.createLogger({
			level: process.env.LOG_LEVEL,
			format: formatter(),
		});
		this.logger.add(
			new winston.transports.Console({
				format: winston.format.json(),
				stderrLevels: [LogLevel.Error, LogLevel.Warn],
			}),
		);
	}

	error(message: string, _trace?: string) {
		this.logger.error(message, {
			context: this.context,
		});
	}

	log(message: string) {
		this.logger.log(message, { context: this.context });
	}

	warn(message: string) {
		this.logger.warn(message, { context: this.context });
	}

	info(message: string) {
		this.logger.info(message, { context: this.context });
	}
}

/** winston formatter */
const formatter = winston.format((info) => {
	if (info.level === LogLevel.HTTP) {
		return info;
	}
	info.message = `[${moment().format('ddd MMM DD HH:mm:ss YYYY')}] [${
		info.level
	}] ${info.message}`;

	return info;
});
