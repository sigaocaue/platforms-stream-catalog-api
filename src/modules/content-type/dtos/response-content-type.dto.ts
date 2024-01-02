import { StreamingContentDto } from '@modules/streaming-content';
import { Expose, Type } from 'class-transformer';

export class ContributionRoleDto {
  constructor(partial: Partial<ContributionRoleDto>) {
    Object.assign(this, partial);
  }

  @Expose()
  name: string;

  @Expose()
  @Type(() => StreamingContentDto)
  streamingContents?: StreamingContentDto[];
}
