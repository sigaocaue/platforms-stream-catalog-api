import { PrismaModule } from '@modules/prisma/prisma.module';
import { StreamingContentModule } from '@modules/streaming-content/streaming-content.module';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import * as Controllers from './controllers';
import * as Services from './services';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule,
    PrismaModule,
    StreamingContentModule,
    TerminusModule,
  ],
  controllers: [Controllers.HealthController, Controllers.NestRootController],
  providers: [Services.HealthService],
})
export class NestRootModule {}
