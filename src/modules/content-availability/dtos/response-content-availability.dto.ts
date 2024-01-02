import { StreamingContentDto } from '@modules/streaming-content';
import { StreamingPlatformDto } from '@modules/streaming-platform';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import moment from 'moment';

export class ContentAvailabilityDto {
  constructor(partial: Partial<ContentAvailabilityDto>) {
    Object.assign(this, partial);
  }

  @Exclude()
  streamingPlatformId: string;

  @Exclude()
  streamingContentId: string;

  @Expose()
  entryDate: string;

  @Expose()
  @Transform(({ value }) =>
    value instanceof Date ? moment(value).toISOString() : value,
  )
  exitDate?: Date | string | null;

  @Expose()
  @Type(() => StreamingContentDto)
  streamingContent?: StreamingContentDto;

  @Expose()
  @Type(() => StreamingPlatformDto)
  streamingPlatform?: StreamingPlatformDto;
}
