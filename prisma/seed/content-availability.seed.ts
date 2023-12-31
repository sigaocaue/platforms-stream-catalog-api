import { PrismaClient, ContentAvailability } from '@prisma/client';
import { ContentSeed } from './content.seed';
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
    await new ContentSeed(this.prismaClient).seed();

    const data: ContentAvailability[] = [
      {
        streamingPlatformId: 'Netflix',
        contentId: 'tv-show.cyberpunk-edgerunners',
        entryDate: new Date(2022, 8, 13),
        exitDate: null,
      },
      {
        streamingPlatformId: 'Netflix',
        contentId: 'movie.limitless',
        entryDate: new Date(2021, 1, 20),
        exitDate: new Date(2021, 11, 25),
      },
      {
        streamingPlatformId: 'Prime Video',
        contentId: 'movie.limitless',
        entryDate: new Date(2022, 11, 10),
        exitDate: null,
      },
      {
        streamingPlatformId: 'Star Plus',
        contentId: 'movie.limitless',
        entryDate: new Date(2022, 11, 10),
        exitDate: new Date(2023, 2, 10),
      },
      {
        streamingPlatformId: 'Prime Video',
        contentId: 'movie.the-hangover',
        entryDate: new Date(2023, 0, 15),
        exitDate: null,
      },
      {
        streamingPlatformId: 'HBO Max',
        contentId: 'movie.the-hangover',
        entryDate: new Date(2021, 10, 5),
        exitDate: null,
      },
      {
        streamingPlatformId: 'HBO Max',
        contentId: 'movie.joker',
        entryDate: new Date(2023, 0, 5),
        exitDate: null,
      },
    ];

    for (const contentAvailability of data) {
      await this.prismaClient.contentAvailability.upsert({
        where: {
          streamingPlatformId_contentId_entryDate: {
            streamingPlatformId: contentAvailability.streamingPlatformId,
            contentId: contentAvailability.contentId,
            entryDate: contentAvailability.entryDate,
          },
        },
        create: contentAvailability,
        update: {
          exitDate: contentAvailability.exitDate,
        },
      });
    }

    return data;
  }
}

export default ContentAvailabilitySeed;
