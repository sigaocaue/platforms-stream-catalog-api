import { ContentContributionDto } from '@modules/content-contribution';
import { Expose, Type } from 'class-transformer';

export class ContributionRoleDto {
  constructor(partial: Partial<ContributionRoleDto>) {
    Object.assign(this, partial);
  }

  @Expose()
  name: string;

  @Expose()
  description?: string | null;

  @Expose()
  @Type(() => ContentContributionDto)
  contentContribution?: ContentContributionDto[];
}
