import { Logger } from '@nestjs/common';
import { TwoPointersPattern } from '.';

export abstract class TwoPointersPatternUsage {
	private static logger = new Logger(TwoPointersPatternUsage.name);

	/** strings isPalidrome usage */
	public static isPalidromeUsage() {
		const resultOne = TwoPointersPattern.isPalidrome(
			'A man, a plan, a canal: Panama',
		);
		const resultTwo = TwoPointersPattern.isPalidrome('race a car');

		this.logger.debug('isPalidrome result one -> ' + resultOne);
		this.logger.debug('isPalidrome result two -> ' + resultTwo);
	}
}
