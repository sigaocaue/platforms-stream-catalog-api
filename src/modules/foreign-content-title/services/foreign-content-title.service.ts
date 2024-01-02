import {
  PrismaAdapterBase,
  PrismaBaseInterface,
  PrismaService,
} from '@modules/prisma';
import { Injectable } from '@nestjs/common';
import {
  CreateForeignContentTitleDto,
  ForeignContentTitleDto,
  UpdateForeignContentTitleDto,
} from '../dtos';
import { ForeignContentTitleEntity } from '../entities/foreign-content-title.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class ForeignContentTitleService
  extends PrismaAdapterBase<ForeignContentTitleEntity>
  implements PrismaBaseInterface
{
  constructor(protected readonly prismaService: PrismaService) {
    super(prismaService, 'streamingContent');
    this.orderBy = [
      { localTitle: 'asc' },
      { country: 'asc' },
      { createdAt: 'desc' },
    ];
    this.classToResponse = ForeignContentTitleDto;
  }

  public async create<ForeignContentTitleDto>(
    input: CreateForeignContentTitleDto,
  ): Promise<ForeignContentTitleDto> {
    const { streamingContentId, ...foreignContentTitle } = input;

    return super.create({
      ...foreignContentTitle,
      streamingContent: {
        connect: {
          id: streamingContentId,
        },
      },
    } as Prisma.ForeignContentTitleCreateInput);
  }

  public async update<ForeignContentTitleDto>(
    id: string,
    input: UpdateForeignContentTitleDto,
  ): Promise<ForeignContentTitleDto> {
    const { streamingContentId, ...foreignContentTitle } = input;

    return super.update(id, {
      ...foreignContentTitle,
      streamingContent:
        typeof streamingContentId === 'string'
          ? {
              connect: {
                id: streamingContentId,
              },
            }
          : undefined,
    } as Prisma.ForeignContentTitleUpdateInput);
  }
}
