import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
	ApiConsumes,
	ApiCreatedResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';
import { CreateChatCompletionRequest } from 'src/dto/create-chat-completion.request';
import { OpenaiService } from './openai.service';
import { ChatCompletion } from 'openai/resources';

@Controller('openai')
@ApiTags('open-ai')
export class OpenaiController {
	constructor(private readonly openaiService: OpenaiService) {}

	@Post('chatCompletion')
	@HttpCode(HttpStatus.CREATED)
	@ApiCreatedResponse({
		type: CreateChatCompletionRequest,
		description: 'chat created successfully',
	})
	@ApiOperation({ description: 'user create api' })
	@ApiConsumes('application/json')
	async createChatCompletion(
		@Body() body: CreateChatCompletionRequest,
	): Promise<ChatCompletion> {
		return this.openaiService.createChatCompletion(body.messages);
	}
}
