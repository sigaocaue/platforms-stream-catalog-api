import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestRootModule } from './modules/nest-root/nest-root.module';
import { ZodValidationPipe } from './modules/nest-root/pipes/zod-validation.pipe';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(NestRootModule, {
    bodyParser: true,
  });

  const reflector: Reflector = app.get(Reflector);
  app.useGlobalPipes(new ZodValidationPipe(reflector));

  const configService: ConfigService = app.get<ConfigService>(
    ConfigService<{ APPLICATION_PORT: number }, true>,
  );

  const applicationPort =
    configService?.get<number>('APPLICATION_PORT', 3000, {
      infer: true,
    }) || 3000;

  await app.listen(applicationPort);
  console.log(`Application listening on port ${applicationPort}`);
}

bootstrap().catch((error: Error) => {
  console.error(error);
});
