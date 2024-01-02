import { SetMetadata } from '@nestjs/common';
import { z } from 'zod';

export const createContentAvailabilitySchema = z.object({
  streamingPlatformId: z.string(),
  streamingContentId: z.string(),
  entryDate: z.string().datetime(),
  exitDate: z.string().datetime().nullable().optional(),
});

@SetMetadata('ZOD_SCHEMA', createContentAvailabilitySchema)
export class CreateContentAvailabilityDto
  implements z.infer<typeof createContentAvailabilitySchema>
{
  streamingPlatformId: string;
  streamingContentId: string;
  entryDate: string;
  exitDate?: string | null;
}
