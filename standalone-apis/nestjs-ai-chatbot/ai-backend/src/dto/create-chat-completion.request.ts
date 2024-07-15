import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

/**
 * Create Chat Completion Request Dto
 */
export class CreateChatCompletionRequest {
	@ApiProperty({
		description: 'messages',
		example: [
			{
				role: 'user',
				content: 'Hello?',
			},
		],
		required: true,
	})
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => ChatCompletionMessageDto)
	messages: ChatCompletionMessageDto[];
}

/**
 * Chat Completion Message Dto
 */
export class ChatCompletionMessageDto {
	@ApiProperty({
		description: 'role',
		required: true,
	})
	@IsString()
	@IsNotEmpty()
	role: string;

	@ApiProperty({
		description: 'content',
		required: true,
	})
	@IsString()
	@IsNotEmpty()
	content: string;
}
