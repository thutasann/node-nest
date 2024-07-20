import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { EmailOptions } from '../core/types/global.types';

@Injectable()
export class EmailService {
	constructor(private mailService: MailerService) {}

	async sendEmail({
		subject,
		email,
		name,
		activationCode,
		template,
	}: EmailOptions) {
		await this.mailService.sendMail({
			to: email,
			subject,
			template,
			context: {
				name,
				activationCode,
			},
		});
	}
}
