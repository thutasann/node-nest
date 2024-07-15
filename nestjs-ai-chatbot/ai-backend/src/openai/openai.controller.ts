import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateChatCompletionRequest } from 'src/dto/create-chat-completion.request';

@Controller('openai')
@ApiTags('open-ai')
export class OpenaiController {
	@Post('chatCompletion')
	async createChatCompletion(@Body() body: CreateChatCompletionRequest) {}
}
