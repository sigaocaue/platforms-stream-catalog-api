import { createPersonSchema } from './request-create-person.dto';
import { SetMetadata } from '@nestjs/common';
import { z } from 'zod';

export const updatePersonSchema = createPersonSchema
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

@SetMetadata('ZOD_SCHEMA', updatePersonSchema)
export class UpdatePersonDto implements z.infer<typeof updatePersonSchema> {
  constructor(partial: Partial<UpdatePersonDto>) {
    Object.assign(this, partial);
  }

  name?: string;
  pseudonym?: string | null;
  birthDate?: string | null;
  nationality?: string | null;
}
