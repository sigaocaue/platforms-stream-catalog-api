import { ContentAvailabilityDto } from '@modules/content-availability';
import { Expose, Type } from 'class-transformer';

export class StreamingPlatformDto {
  constructor(partial: Partial<StreamingPlatformDto>) {
    Object.assign(this, partial);
  }

  @Expose()
  name: string;

  @Expose()
  website?: string | null;

  @Expose()
  @Type(() => ContentAvailabilityDto)
  contentAvailabilities?: ContentAvailabilityDto[];
}
