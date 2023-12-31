import { PrismaClient, ContentContribution } from '@prisma/client';
import { ContentSeed } from './content.seed';
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
    await new ContentSeed(this.prismaClient).seed();
    await new ContributionRoleSeed(this.prismaClient).seed();
    await new PersonSeed(this.prismaClient).seed();

    const data: ContentContribution[] = [
      {
        contentId: 'movie.limitless',
        personId: 'bradley-cooper',
        contributionRoleName: 'actor',
      },
      {
        contentId: 'movie.the-hangover',
        personId: 'bradley-cooper',
        contributionRoleName: 'actor',
      },
      {
        contentId: 'movie.the-hangover',
        personId: 'todd-phillips',
        contributionRoleName: 'director',
      },
    ];

    for (const contentContribution of data) {
      await this.prismaClient.contentContribution.upsert({
        where: {
          contentId_personId_contributionRoleName: contentContribution,
        },
        create: contentContribution,
        update: {},
      });
    }

    return data;
  }
}

export default ContentContributionSeed;
