import { SetMetadata } from '@nestjs/common';
import { z } from 'zod';

export const createForeignContentTitleSchema = z.object({
  streamingContentId: z.string(),
  country: z.string(),
  localTitle: z.string(),
});

@SetMetadata('ZOD_SCHEMA', createForeignContentTitleSchema)
export class CreateForeignContentTitleDto
  implements z.infer<typeof createForeignContentTitleSchema>
{
  streamingContentId: string;
  country: string;
  localTitle: string;
}
