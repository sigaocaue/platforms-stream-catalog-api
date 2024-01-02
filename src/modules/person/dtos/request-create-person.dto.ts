import {
  createContentContributionSchema,
  CreateContentContributionDto,
} from '@modules/content-contribution';
import { SetMetadata } from '@nestjs/common';
import { z } from 'zod';

export const createPersonSchema = z.object({
  name: z.string(),
  pseudonym: z.string().nullable().optional(),
  birthDate: z.string().nullable().optional(),
  nationality: z.string().nullable().optional(),
  contentContributions: z
    .array(
      createContentContributionSchema.omit({
        personId: true,
      }),
    )
    .optional(),
});

@SetMetadata('ZOD_SCHEMA', createPersonSchema)
export class CreatePersonDto implements z.infer<typeof createPersonSchema> {
  constructor(partial: Partial<CreatePersonDto>) {
    Object.assign(this, partial);
  }

  name: string;
  pseudonym?: string | null;
  birthDate?: string | null;
  nationality?: string | null;
  contentContributions?: Omit<CreateContentContributionDto, 'personId'>[];
}
