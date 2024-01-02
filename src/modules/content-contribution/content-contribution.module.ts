import { Module } from '@nestjs/common';
import { ContentContributionController } from './controllers';
import { ContentContributionService } from './services';

@Module({
  controllers: [ContentContributionController],
  providers: [ContentContributionService],
})
export class ContentContributionModule {}
