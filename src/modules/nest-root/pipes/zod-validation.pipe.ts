import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SafeParseError, ZodType } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly reflector: Reflector) {}

  private isZodSchema(paramType: any): boolean {
    return (
      typeof paramType === 'object' &&
      paramType !== null &&
      paramType instanceof ZodType
    );
  }

  public transform(value: any, metadata: ArgumentMetadata) {
    const zodSchema: ZodType<any> | undefined = this.reflector.get(
      'ZOD_SCHEMA',
      metadata?.metatype,
    );

    if (this.isZodSchema(zodSchema)) {
      const zodResult = zodSchema.safeParse(value);
      if (zodResult?.success) {
        return zodResult.data;
      }
      throw new BadRequestException((zodResult as SafeParseError<void>)?.error);
    }

    return value;
  }
}
