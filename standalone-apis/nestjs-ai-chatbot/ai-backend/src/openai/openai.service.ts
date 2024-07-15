import { Injectable, Logger } from '@nestjs/common';
import OpenAI from 'openai';
import { ChatCompletion, ChatCompletionMessageParam } from 'openai/resources';
import { ChatCompletionMessageDto } from 'src/dto/create-chat-completion.request';

@Injectable()
export class OpenaiService {
	private readonly logger = new Logger(OpenaiService.name);

	constructor(private readonly openai: OpenAI) {}

	async createChatCompletion(
		messages: ChatCompletionMessageDto[],
	): Promise<ChatCompletion> {
		try {
			this.logger.log(this.openai);
			return this.openai.chat.completions.create({
				messages: messages as ChatCompletionMessageParam[],
				model: 'gpt-3.5-turbo-0125',
			});
		} catch (error) {
			this.logger.debug(`chat completion error: ${error}`);
		}
	}
}
