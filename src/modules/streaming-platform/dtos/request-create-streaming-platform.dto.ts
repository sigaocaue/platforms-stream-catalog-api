import { SetMetadata } from '@nestjs/common';
import { z } from 'zod';

export const createStreamingPlatformSchema = z.object({
  name: z.string(),
  website: z.string().nullable().optional(),
});

@SetMetadata('ZOD_SCHEMA', createStreamingPlatformSchema)
export class CreateStreamingPlatformDto
  implements z.infer<typeof createStreamingPlatformSchema>
{
  name: string;
  website?: string | null;
}
