import {
  PrismaAdapterBase,
  PrismaBaseInterface,
  PrismaService,
} from '@modules/prisma';
import { Injectable } from '@nestjs/common';
import {
  CreateContentContributionDto,
  ContentContributionDto,
  UpdateContentContributionDto,
} from '../dtos';
import { ContentContributionEntity } from '../entities/content-contribution.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class ContentContributionService
  extends PrismaAdapterBase<ContentContributionEntity>
  implements PrismaBaseInterface
{
  constructor(protected readonly prismaService: PrismaService) {
    super(prismaService, 'streamingContent');
    this.orderBy = [
      { contributionRoleName: 'asc' },
      { streamingContentId: 'asc' },
      { personId: 'asc' },
      { createdAt: 'desc' },
    ];
    this.classToResponse = ContentContributionDto;
  }

  public async create<ContentContributionDto>(
    input: CreateContentContributionDto,
  ): Promise<ContentContributionDto> {
    const { streamingContentId, personId, contributionRoleName } = input;

    return super.create({
      streamingContent: {
        connect: {
          id: streamingContentId,
        },
      },
      person: {
        connect: {
          id: personId,
        },
      },
      contributionRole: {
        connect: {
          name: contributionRoleName,
        },
      },
    } as Prisma.ContentContributionCreateInput);
  }

  public async update<ContentContributionDto>(
    id: string,
    input: UpdateContentContributionDto,
  ): Promise<ContentContributionDto> {
    const { streamingContentId, personId, contributionRoleName } = input;
    return super.update(id, {
      streamingContent:
        typeof streamingContentId === 'string'
          ? {
              connect: {
                id: streamingContentId,
              },
            }
          : undefined,
      person:
        typeof personId === 'string'
          ? {
              connect: {
                id: personId,
              },
            }
          : undefined,
      contributionRole:
        typeof contributionRoleName === 'string'
          ? {
              connect: {
                name: contributionRoleName,
              },
            }
          : undefined,
    } as Prisma.ContentContributionUpdateInput);
  }
}
