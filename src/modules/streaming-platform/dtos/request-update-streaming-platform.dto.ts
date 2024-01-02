import { createStreamingPlatformSchema } from './request-create-streaming-platform.dto';
import { SetMetadata } from '@nestjs/common';
import { z } from 'zod';

export const updateStreamingPlatformSchema = createStreamingPlatformSchema
  .partial()
  .refine(
    (data) => {
      return Object.values(data).some((value) => value !== undefined);
    },
    {
      message: 'At least one property must be defined',
    },
  );

@SetMetadata('ZOD_SCHEMA', updateStreamingPlatformSchema)
export class UpdateStreamingPlatformDto
  implements z.infer<typeof updateStreamingPlatformSchema>
{
  constructor(partial: Partial<UpdateStreamingPlatformDto>) {
    Object.assign(this, partial);
  }

  name?: string;
  website?: string | null;
}
