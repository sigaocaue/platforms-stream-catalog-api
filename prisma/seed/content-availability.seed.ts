import { PrismaClient, ContentAvailability } from '@prisma/client';
import { StreamingContentSeed } from './streaming-content.seed';
import { SeedInterface } from './seed.interface';
import { SeedBase } from './seed.base';
import { StreamingPlatformSeed } from './streaming-platform.seed';

export class ContentAvailabilitySeed
  extends SeedBase<ContentAvailability>
  implements SeedInterface<ContentAvailability>
{
  constructor(protected readonly prismaClient: PrismaClient) {
    super();
  }

  public async seed(): Promise<ContentAvailability[]> {
    await new StreamingPlatformSeed(this.prismaClient).seed();
    await new StreamingContentSeed(this.prismaClient).seed();

    const data: ContentAvailability[] = [
      {
        id: '69f5f7b6-03fa-4085-9fe7-1d3893f48f21',
        streamingPlatformId: 'Netflix',
        streamingContentId: 'tv-show.cyberpunk-edgerunners',
        entryDate: new Date(2022, 8, 13),
        exitDate: null,
        createdAt: new Date(),
      },
      {
        id: '72b87272-09f0-44fd-9374-000d7ddcf68f',
        streamingPlatformId: 'Netflix',
        streamingContentId: 'movie.limitless',
        entryDate: new Date(2021, 1, 20),
        exitDate: new Date(2021, 11, 25),
        createdAt: new Date(),
      },
      {
        id: '2219c52d-d2fe-4b49-b9d9-b89fb9aae8c7',
        streamingPlatformId: 'Prime Video',
        streamingContentId: 'movie.limitless',
        entryDate: new Date(2022, 11, 10),
        exitDate: null,
        createdAt: new Date(),
      },
      {
        id: '33db27d4-b7b4-414b-8bf6-e7f5a355be35',
        streamingPlatformId: 'Star Plus',
        streamingContentId: 'movie.limitless',
        entryDate: new Date(2022, 11, 10),
        exitDate: new Date(2023, 2, 10),
        createdAt: new Date(),
      },
      {
        id: 'cc00ac9e-fee5-47b0-afd4-f20a7dc88deb',
        streamingPlatformId: 'Prime Video',
        streamingContentId: 'movie.the-hangover',
        entryDate: new Date(2023, 0, 15),
        exitDate: null,
        createdAt: new Date(),
      },
      {
        id: '30878c0d-1c26-4e65-8c6f-0b888a6efaaa',
        streamingPlatformId: 'HBO Max',
        streamingContentId: 'movie.the-hangover',
        entryDate: new Date(2021, 10, 5),
        exitDate: null,
        createdAt: new Date(),
      },
      {
        id: '68aecaba-eee4-4148-a3e0-16d5be328135',
        streamingPlatformId: 'HBO Max',
        streamingContentId: 'movie.joker',
        entryDate: new Date(2023, 0, 5),
        exitDate: null,
        createdAt: new Date(),
      },
    ];

    for (const contentAvailability of data) {
      await this.prismaClient.contentAvailability.upsert({
        where: {
          uniqueKey: {
            streamingPlatformId: contentAvailability.streamingPlatformId,
            streamingContentId: contentAvailability.streamingContentId,
            exitDate: contentAvailability.exitDate,
          },
        },
        create: contentAvailability,
        update: {
          id: contentAvailability.id,
          entryDate: contentAvailability.entryDate,
        },
      });
    }

    return data;
  }
}

export default ContentAvailabilitySeed;
