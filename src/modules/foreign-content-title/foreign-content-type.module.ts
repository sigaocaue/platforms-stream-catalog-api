import { Module } from '@nestjs/common';
import { ForeignContentTitleController } from './controllers';
import { ForeignContentTitleService } from './services';

@Module({
  controllers: [ForeignContentTitleController],
  providers: [ForeignContentTitleService],
})
export class ForeignContentTypeModule {}
