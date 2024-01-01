import { PrismaClient, ContentTitle } from '@prisma/client';
import { StreamingContentSeed } from './streaming-content.seed';
import { SeedInterface } from './seed.interface';
import { SeedBase } from './seed.base';

export class ContentTitleSeed
  extends SeedBase<ContentTitle>
  implements SeedInterface<ContentTitle>
{
  constructor(protected readonly prismaClient: PrismaClient) {
    super();
  }

  public async seed(): Promise<ContentTitle[]> {
    await new StreamingContentSeed(this.prismaClient).seed();
    const data: ContentTitle[] = [
      {
        streamingContentId: 'movie.limitless',
        country: 'Brazil',
        localTitle: 'Sem limites',
      },
      {
        streamingContentId: 'movie.the-hangover',
        country: 'Brazil',
        localTitle: 'Se Beber, Não Case!',
      },
      {
        streamingContentId: 'movie.joker',
        country: 'Brazil',
        localTitle: 'Coringa',
      },
    ];

    for (const contentTitle of data) {
      await this.prismaClient.contentTitle.upsert({
        where: {
          streamingContentId_country: {
            streamingContentId: contentTitle.streamingContentId,
            country: contentTitle.country,
          },
        },
        create: contentTitle,
        update: {
          localTitle: contentTitle.localTitle,
        },
      });
    }

    return data;
  }
}

export default ContentTitleSeed;
