import { createForeignContentTitleSchema } from './request-create-foreign-content-title.dto';
import { SetMetadata } from '@nestjs/common';
import { z } from 'zod';

export const updateForeignContentTitleSchema = createForeignContentTitleSchema
  .partial()
  .refine(
    (data) => {
      return Object.values(data).some((value) => value !== undefined);
    },
    {
      message: 'At least one property must be defined',
    },
  );

@SetMetadata('ZOD_SCHEMA', updateForeignContentTitleSchema)
export class UpdateForeignContentTitleDto
  implements z.infer<typeof updateForeignContentTitleSchema>
{
  constructor(partial: Partial<UpdateForeignContentTitleDto>) {
    Object.assign(this, partial);
  }

  streamingContentId?: string;
  country?: string;
  localTitle?: string;
}
