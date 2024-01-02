import { PrismaClient, ContentContribution } from '@prisma/client';
import { StreamingContentSeed } from './streaming-content.seed';
import { ContributionRoleSeed } from './contribution-role.seed';
import { PersonSeed } from './person.seed';
import { SeedInterface } from './seed.interface';
import { SeedBase } from './seed.base';

export class ContentContributionSeed
  extends SeedBase<ContentContribution>
  implements SeedInterface<ContentContribution>
{
  constructor(protected readonly prismaClient: PrismaClient) {
    super();
  }

  public async seed(): Promise<ContentContribution[]> {
    await new StreamingContentSeed(this.prismaClient).seed();
    await new ContributionRoleSeed(this.prismaClient).seed();
    await new PersonSeed(this.prismaClient).seed();

    const data: ContentContribution[] = [
      {
        id: '0ee920f0-bc17-4709-989a-b7628fe63560',
        streamingContentId: 'movie.limitless',
        personId: 'bradley-cooper',
        contributionRoleName: 'actor',
        createdAt: new Date(),
      },
      {
        id: '206000fe-cf62-4f09-ad86-c3a4cbf05896',
        streamingContentId: 'movie.the-hangover',
        personId: 'bradley-cooper',
        contributionRoleName: 'actor',
        createdAt: new Date(),
      },
      {
        id: '99832493-84ac-41a1-97c0-2603675522d0',
        streamingContentId: 'movie.the-hangover',
        personId: 'todd-phillips',
        contributionRoleName: 'director',
        createdAt: new Date(),
      },
    ];

    for (const contentContribution of data) {
      await this.prismaClient.contentContribution.upsert({
        where: {
          uniqueKey: {
            streamingContentId: contentContribution.streamingContentId,
            personId: contentContribution.personId,
            contributionRoleName: contentContribution.contributionRoleName,
          },
        },
        create: contentContribution,
        update: {
          id: contentContribution.id,
        },
      });
    }

    return data;
  }
}

export default ContentContributionSeed;
