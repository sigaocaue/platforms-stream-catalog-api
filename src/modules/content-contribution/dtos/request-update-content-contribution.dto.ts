import { createContentContributionSchema } from './request-create-content-contribution.dto';
import { SetMetadata } from '@nestjs/common';
import { z } from 'zod';

export const updateContentContributionSchema = createContentContributionSchema
  .partial()
  .refine(
    (data) => {
      return Object.values(data).some((value) => value !== undefined);
    },
    {
      message: 'At least one property must be defined',
    },
  );

@SetMetadata('ZOD_SCHEMA', updateContentContributionSchema)
export class UpdateContentContributionDto
  implements z.infer<typeof updateContentContributionSchema>
{
  constructor(partial: Partial<UpdateContentContributionDto>) {
    Object.assign(this, partial);
  }

  streamingContentId?: string;
  personId?: string;
  contributionRoleName?: string;
}
