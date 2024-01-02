import {
  PrismaAdapterBase,
  PrismaBaseInterface,
  PrismaService,
} from '@modules/prisma';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import moment from 'moment';
import {
  CreateContentAvailabilityDto,
  ContentAvailabilityDto,
  UpdateContentAvailabilityDto,
} from '../dtos';
import { ContentAvailabilityEntity } from '../entities';

@Injectable()
export class ContentAvailabilityService
  extends PrismaAdapterBase<ContentAvailabilityEntity>
  implements PrismaBaseInterface
{
  constructor(protected readonly prismaService: PrismaService) {
    super(prismaService, 'streamingContent');
    this.orderBy = [
      { streamingPlatformId: 'asc' },
      { streamingContentId: 'asc' },
      { entryDate: 'desc' },
      { createdAt: 'desc' },
    ];
    this.classToResponse = ContentAvailabilityDto;
  }

  public async create<ContentAvailabilityDto>(
    input: CreateContentAvailabilityDto,
  ): Promise<ContentAvailabilityDto> {
    const { streamingPlatformId, streamingContentId, entryDate, exitDate } =
      input;

    return super.create({
      streamingPlatform: {
        connect: { name: streamingPlatformId },
      },
      streamingContent: {
        connect: { id: streamingContentId },
      },
      entryDate: moment(entryDate).toDate(),
      exitDate: exitDate ? moment(exitDate).toDate() : null,
    } as Prisma.ContentAvailabilityCreateInput);
  }

  public async update<ContentAvailabilityDto>(
    id: string,
    input: UpdateContentAvailabilityDto,
  ): Promise<ContentAvailabilityDto> {
    const { streamingPlatformId, streamingContentId, ...contentAvailability } =
      input;

    return super.update(id, {
      ...contentAvailability,
      streamingPlatform:
        typeof streamingPlatformId === 'string'
          ? {
              connect: { name: streamingPlatformId },
            }
          : undefined,
      streamingContent:
        typeof streamingContentId === 'string'
          ? {
              connect: { id: streamingContentId },
            }
          : undefined,
    } as Prisma.ContentAvailabilityUpdateInput);
  }
}
