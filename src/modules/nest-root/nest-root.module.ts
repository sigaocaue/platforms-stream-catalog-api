import { PrismaModule } from '@modules/prisma/prisma.module';
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
    TerminusModule,
  ],
  controllers: [Controllers.HealthController, Controllers.NestRootController],
  providers: [Services.HealthService],
})
export class NestRootModule {}
