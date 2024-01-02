import { Module } from '@nestjs/common';
import { ContentAvailabilityController } from './controllers';
import { ContentAvailabilityService } from './services';

@Module({
  controllers: [ContentAvailabilityController],
  providers: [ContentAvailabilityService],
})
export class ContentAvailabilityModule {}
