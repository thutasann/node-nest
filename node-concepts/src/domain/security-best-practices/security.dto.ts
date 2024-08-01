import { ApiProperty } from '@nestjs/swagger';

export class SanitizeHtmlDto {
	@ApiProperty({
		description: 'html string',
		example: "<script>alert('hello world')</script>",
		required: true,
	})
	htmlString: string;
}
