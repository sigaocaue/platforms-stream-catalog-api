import { SetMetadata } from '@nestjs/common';
import { z } from 'zod';

export const createContributionRoleSchema = z.object({
  name: z.string(),
  description: z.string().nullable().optional(),
});

@SetMetadata('ZOD_SCHEMA', createContributionRoleSchema)
export class CreateContributionRoleDto
  implements z.infer<typeof createContributionRoleSchema>
{
  name: string;
  description?: string | null;
}
