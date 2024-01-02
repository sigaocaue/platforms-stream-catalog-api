import { createContentAvailabilitySchema } from './request-create-content-availability.dto';
import { SetMetadata } from '@nestjs/common';
import { z } from 'zod';

export const updateContentAvailabilitySchema = createContentAvailabilitySchema
  .partial()
  .refine(
    (data) => {
      return Object.values(data).some((value) => value !== undefined);
    },
    {
      message: 'At least one property must be defined',
    },
  );

@SetMetadata('ZOD_SCHEMA', updateContentAvailabilitySchema)
export class UpdateContentAvailabilityDto
  implements z.infer<typeof updateContentAvailabilitySchema>
{
  constructor(partial: Partial<UpdateContentAvailabilityDto>) {
    Object.assign(this, partial);
  }

  streamingPlatformId?: string;
  streamingContentId?: string;
  entryDate?: string;
  exitDate?: string | null;
}
