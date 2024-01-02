import { Module } from '@nestjs/common';
import { StreamingContentController } from './controllers';
import { StreamingContentService } from './services';

@Module({
  controllers: [StreamingContentController],
  providers: [StreamingContentService],
})
export class StreamingContentModule {}
