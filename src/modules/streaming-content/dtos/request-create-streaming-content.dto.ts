import {
  createContentContributionSchema,
  CreateContentContributionDto,
} from '@modules/content-contribution';
import { SetMetadata } from '@nestjs/common';
import { z } from 'zod';

export const createStreamingContentSchema = z.object({
  contentTypeName: z.string(),
  title: z.string(),
  releaseDate: z.string().datetime(),
  imdbRating: z.number().positive(),
  duration: z.number().int().positive(),
  storyline: z.string().nullable().optional(),
  contentContributions: z
    .array(
      createContentContributionSchema.omit({
        streamingContentId: true,
      }),
    )
    .optional(),
});

@SetMetadata('ZOD_SCHEMA', createStreamingContentSchema)
export class CreateStreamingContentDto
  implements z.infer<typeof createStreamingContentSchema>
{
  constructor(partial: Partial<CreateStreamingContentDto>) {
    Object.assign(this, partial);
  }

  contentTypeName: string;
  title: string;
  releaseDate: string;
  imdbRating: number;
  duration: number;
  storyline?: string;
  contentContributions?: Omit<
    CreateContentContributionDto,
    'streamingContentId'
  >[];
}
