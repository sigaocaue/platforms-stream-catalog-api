import { PrismaClient, ContentTitle } from '@prisma/client';
import { ContentSeed } from './content.seed';
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
    await new ContentSeed(this.prismaClient).seed();
    const data: ContentTitle[] = [
      {
        contentId: 'movie.limitless',
        country: 'Brazil',
        localTitle: 'Sem limites',
      },
      {
        contentId: 'movie.the-hangover',
        country: 'Brazil',
        localTitle: 'Se Beber, Não Case!',
      },
      {
        contentId: 'movie.joker',
        country: 'Brazil',
        localTitle: 'Coringa',
      },
    ];

    for (const contentTitle of data) {
      await this.prismaClient.contentTitle.upsert({
        where: {
          contentId_country: {
            contentId: contentTitle.contentId,
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
