import { PrismaClient, ContributionRole } from '@prisma/client';
import { SeedInterface } from './seed.interface';
import { SeedBase } from './seed.base';

export class ContributionRoleSeed
  extends SeedBase<ContributionRole>
  implements SeedInterface<ContributionRole>
{
  constructor(protected readonly prismaClient: PrismaClient) {
    super();
  }

  public async seed(): Promise<ContributionRole[]> {
    const data: ContributionRole[] = [
      {
        name: 'actor',
        description: null,
        createdAt: new Date(),
      },
      {
        name: 'director',
        description: 'film director',
        createdAt: new Date(),
      },
      {
        name: 'screenwriter',
        description: null,
        createdAt: new Date(),
      },
    ];

    for (const { name, description } of data) {
      await this.prismaClient.contributionRole.upsert({
        where: {
          name,
        },
        create: {
          name,
          description,
        },
        update: {
          description,
        },
      });
    }

    return data;
  }
}

export default ContributionRoleSeed;
