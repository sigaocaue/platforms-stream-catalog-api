import {
  PrismaAdapterBase,
  PrismaBaseInterface,
  PrismaService,
} from '@modules/prisma';
import { Injectable } from '@nestjs/common';
import {
  CreateStreamingContentDto,
  UpdateStreamingContentDto,
  StreamingContentDto,
} from '../dtos';
import { StreamingContentEntity } from '../entities/streaming-content.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class StreamingContentService
  extends PrismaAdapterBase<StreamingContentEntity>
  implements PrismaBaseInterface<StreamingContentEntity>
{
  constructor(protected readonly prismaService: PrismaService) {
    super(prismaService, 'streamingContent');
    this.orderBy = [
      { title: 'asc' },
      { releaseDate: 'desc' },
      { imdbRating: 'desc' },
      { createdAt: 'desc' },
    ];
    this.classToResponse = StreamingContentDto;
  }

  public async create<StreamingContentDto>(
    input: CreateStreamingContentDto,
  ): Promise<StreamingContentDto> {
    const { contentContributions, contentTypeName, ...streamingContent } =
      input;

    return super.create({
      ...streamingContent,
      contentType: {
        connectOrCreate: {
          where: {
            name: contentTypeName,
          },
          create: {
            name: contentTypeName,
            createdAt: new Date(),
          },
        },
      },
      contentContributions:
        Array.isArray(contentContributions) && contentContributions.length > 0
          ? {
              createMany: {
                data: contentContributions,
                skipDuplicates: true,
              },
            }
          : undefined,
    } as Prisma.StreamingContentCreateInput);
  }

  public async update<StreamingContentDto>(
    id: string,
    input: UpdateStreamingContentDto,
  ): Promise<StreamingContentDto> {
    return super.update(id, input);
  }
}
