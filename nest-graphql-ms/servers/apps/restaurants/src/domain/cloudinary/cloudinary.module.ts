import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryProvider } from './cloudinary.provider';

@Module({
	providers: [CloudinaryProvider, CloudinaryService],
})
export class CloudinaryModule {}
