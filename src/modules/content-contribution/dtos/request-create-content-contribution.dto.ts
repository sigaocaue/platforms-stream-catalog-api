import { SetMetadata } from '@nestjs/common';
import { z } from 'zod';

export const createContentContributionSchema = z.object({
  streamingContentId: z.string(),
  personId: z.string(),
  contributionRoleName: z.string(),
});

@SetMetadata('ZOD_SCHEMA', createContentContributionSchema)
export class CreateContentContributionDto
  implements z.infer<typeof createContentContributionSchema>
{
  streamingContentId: string;
  personId: string;
  contributionRoleName: string;
}
