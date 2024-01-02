import { PrismaClient, StreamingPlatform } from '@prisma/client';
import { SeedInterface } from './seed.interface';
import { SeedBase } from './seed.base';

export class StreamingPlatformSeed
  extends SeedBase<StreamingPlatform>
  implements SeedInterface<StreamingPlatform>
{
  constructor(protected readonly prismaClient: PrismaClient) {
    super();
  }

  public async seed(): Promise<StreamingPlatform[]> {
    const data: StreamingPlatform[] = [
      {
        name: 'Netflix',
        website: 'https://www.netflix.com/br/',
        createdAt: new Date(),
      },
      {
        name: 'Prime Video',
        website: 'https://www.primevideo.com/',
        createdAt: new Date(),
      },
      {
        name: 'Disney Plus',
        website: 'https://www.disneyplus.com/pt-br/home',
        createdAt: new Date(),
      },
      {
        name: 'Star Plus',
        website: 'https://www.starplus.com/pt-br/home',
        createdAt: new Date(),
      },
      {
        name: 'HBO Max',
        website: 'https://www.hbomax.com/',
        createdAt: new Date(),
      },
    ];

    for (const { name, website } of data) {
      await this.prismaClient.streamingPlatform.upsert({
        where: {
          name,
        },
        create: {
          name,
        },
        update: {
          website,
        },
      });
    }

    return data;
  }
}

export default StreamingPlatformSeed;
