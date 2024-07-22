import { NestFactory } from '@nestjs/core';
import { RestaurantsModule } from './restaurants.module';

async function bootstrap() {
  const app = await NestFactory.create(RestaurantsModule);
  await app.listen(3000);
}
bootstrap();
