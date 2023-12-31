import { PrismaClient, ContentType } from '@prisma/client';
import { SeedInterface } from './seed.interface';
import { SeedBase } from './seed.base';

export class ContentTypeSeed
  extends SeedBase<ContentType>
  implements SeedInterface<ContentType>
{
  constructor(protected readonly prismaClient: PrismaClient) {
    super();
  }

  public async seed(): Promise<ContentType[]> {
    const contentsTypes: ContentType[] = [
      {
        name: 'movie',
        createdAt: new Date(),
      },
      {
        name: 'tv show',
        createdAt: new Date(),
      },
      {
        name: 'game',
        createdAt: new Date(),
      },
      {
        name: 'book',
        createdAt: new Date(),
      },
    ];

    for (const { name } of contentsTypes) {
      await this.prismaClient.contentType.upsert({
        where: {
          name,
        },
        create: {
          name,
        },
        update: {},
      });
    }

    return contentsTypes;
  }
}

export default ContentTypeSeed;
