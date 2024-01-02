import { PrismaClient, ForeignContentTitle } from '@prisma/client';
import { StreamingContentSeed } from './streaming-content.seed';
import { SeedInterface } from './seed.interface';
import { SeedBase } from './seed.base';

export class ForeignContentTitleSeed
  extends SeedBase<ForeignContentTitle>
  implements SeedInterface<ForeignContentTitle>
{
  constructor(protected readonly prismaClient: PrismaClient) {
    super();
  }

  public async seed(): Promise<ForeignContentTitle[]> {
    await new StreamingContentSeed(this.prismaClient).seed();
    const data: ForeignContentTitle[] = [
      {
        id: 'brazil.limitless',
        streamingContentId: 'movie.limitless',
        country: 'Brazil',
        localTitle: 'Sem limites',
        createdAt: new Date(),
      },
      {
        id: 'brazil.the-hangover',
        streamingContentId: 'movie.the-hangover',
        country: 'Brazil',
        localTitle: 'Se Beber, Não Case!',
        createdAt: new Date(),
      },
      {
        id: 'brazil.joker',
        streamingContentId: 'movie.joker',
        country: 'Brazil',
        localTitle: 'Coringa',
        createdAt: new Date(),
      },
    ];

    for (const contentTitle of data) {
      await this.prismaClient.foreignContentTitle.upsert({
        where: {
          uniqueKey: {
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

export default ForeignContentTitleSeed;
