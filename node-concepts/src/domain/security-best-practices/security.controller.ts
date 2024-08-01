import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { SanitizeHtmlDto } from './security.dto';
import * as sanitizeHtml from 'sanitize-html';

@Controller('security-best-practices')
@ApiTags('security best practices')
export class SecurityController {
	@Get()
	securityHello() {
		return 'Hello from Security Best Practices';
	}

	@Throttle({
		default: {
			limit: 3, // 3 request
			ttl: 6000, // within 6 seconds
		},
	})
	@Get('rate-limit-test')
	rateLimitTest() {
		return 'rate limit test';
	}

	// Rate limiting is applied to this route.
	@SkipThrottle({ default: false })
	@Get('/dont-skip')
	dontSkip() {
		return 'List users work with Rate limiting.';
	}

	/**
	 * sanitize html test
	 * @link https://npmjs.com/package/sanitize-html
	 * @returns
	 */
	@Post('/sanitize-html-test')
	sanitizeHtmlTest(@Body() payload: SanitizeHtmlDto) {
		const sanitized = sanitizeHtml(payload.htmlString);
		console.log('sanitized', sanitized);
		return sanitized;
	}
}
