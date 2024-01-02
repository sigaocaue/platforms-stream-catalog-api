import { SetMetadata } from '@nestjs/common';
import { z } from 'zod';

export const createContentTypeSchema = z.object({
  name: z.string(),
});

@SetMetadata('ZOD_SCHEMA', createContentTypeSchema)
export class CreateContentTypeDto
  implements z.infer<typeof createContentTypeSchema>
{
  name: string;
}
