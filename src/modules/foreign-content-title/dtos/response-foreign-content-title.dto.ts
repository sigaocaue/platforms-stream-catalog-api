import { StreamingContentDto } from '@modules/streaming-content';
import { Exclude, Expose, Type } from 'class-transformer';

export class ForeignContentTitleDto {
  constructor(partial: Partial<ForeignContentTitleDto>) {
    Object.assign(this, partial);
  }

  @Exclude()
  streamingContentId: string;

  @Expose()
  country: string;

  @Expose()
  localTitle: string;

  @Expose()
  @Type(() => StreamingContentDto)
  streamingContent?: StreamingContentDto;
}
