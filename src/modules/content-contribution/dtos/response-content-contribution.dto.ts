import { ContributionRoleDto } from '@modules/contribution-role';
import { PersonDto } from '@modules/person';
import { StreamingContentDto } from '@modules/streaming-content';
import { Exclude, Expose, Type } from 'class-transformer';

export class ContentContributionDto {
  constructor(partial: Partial<ContentContributionDto>) {
    Object.assign(this, partial);
  }

  @Exclude()
  streamingContentId: string;

  @Exclude()
  personId: string;

  @Exclude()
  contributionRoleName: string;

  @Expose()
  @Type(() => StreamingContentDto)
  streamingContent?: StreamingContentDto;

  @Expose()
  @Type(() => PersonDto)
  person?: PersonDto;

  @Expose()
  @Type(() => ContributionRoleDto)
  contributionRole?: ContributionRoleDto;
}
