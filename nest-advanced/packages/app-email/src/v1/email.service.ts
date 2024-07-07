import { Injectable } from '@nestjs/common';
import * as Mail from 'nodemailer/lib/mailer';
import { ConfigService } from '@dev/config';
import { createTransport } from 'nodemailer';

@Injectable()
export class EmailService {
	private nodeMailerTransport: Mail;

	constructor(private readonly configService: ConfigService) {
		this.nodeMailerTransport = createTransport({
			service: this.configService.get().email.service_name,
			auth: {
				user: this.configService.get().email.username,
				pass: this.configService.get().email.password,
			},
		});
	}

	sendEmail(options: Mail.Options) {
		return this.nodeMailerTransport.sendMail(options);
	}
}
