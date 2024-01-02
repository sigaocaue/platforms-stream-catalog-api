import { createStreamingContentSchema } from './request-create-streaming-content.dto';
import { SetMetadata } from '@nestjs/common';
import { z } from 'zod';

export const updateStreamingContentSchema = createStreamingContentSchema
  .partial()
  .omit({
    contentContributions: true,
  })
  .refine(
    (data) => {
      return Object.values(data).some((value) => value !== undefined);
    },
    {
      message: 'At least one property must be defined',
    },
  );

@SetMetadata('ZOD_SCHEMA', updateStreamingContentSchema)
export class UpdateStreamingContentDto
  implements z.infer<typeof updateStreamingContentSchema>
{
  constructor(partial: Partial<UpdateStreamingContentDto>) {
    Object.assign(this, partial);
  }

  contentTypeName?: string;
  title?: string;
  releaseDate?: string;
  imdbRating?: number;
  duration?: number;
  storyline?: string;
}
