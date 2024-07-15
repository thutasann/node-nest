export class CreateChatCompletionRequest {
	messages: ChatCompletionMessageDto[];
}

export class ChatCompletionMessageDto {
	role: string;
	content: string;
}
