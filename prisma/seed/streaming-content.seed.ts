import { PrismaClient, StreamingContent } from '@prisma/client';
import { ContentTypeSeed } from './content-type.seed';
import { SeedInterface } from './seed.interface';
import { SeedBase } from './seed.base';
import { StreamingPlatformSeed } from './streaming-platform.seed';

export class StreamingContentSeed
  extends SeedBase<StreamingContent>
  implements SeedInterface<StreamingContent>
{
  constructor(protected readonly prismaClient: PrismaClient) {
    super();
  }

  public async seed(): Promise<StreamingContent[]> {
    await new ContentTypeSeed(this.prismaClient).seed();
    await new StreamingPlatformSeed(this.prismaClient).seed();

    const data: StreamingContent[] = [
      {
        id: 'movie.limitless',
        contentTypeName: 'movie',
        title: 'Limitless',
        releaseDate: new Date(2011, 2, 25),
        imdbRating: 7.4,
        duration: 105,
        storyline: null,
      },
      {
        id: 'movie.the-hangover',
        contentTypeName: 'movie',
        title: 'The Hangover',
        releaseDate: new Date(2009, 7, 21),
        imdbRating: 7.7,
        duration: 100,
        storyline: null,
      },
      {
        id: 'tv-show.cyberpunk-edgerunners',
        contentTypeName: 'tv show',
        title: 'Cyberpunk: Edgerunners',
        releaseDate: new Date(2022, 8, 13),
        imdbRating: 8.3,
        duration: 24,
        storyline: null,
      },
      {
        id: 'movie.joker',
        contentTypeName: 'movie',
        title: 'Joker',
        releaseDate: new Date(2019, 9, 3),
        imdbRating: 7.7,
        duration: 122,
        storyline: null,
      },
    ];

    for (const streamContent of data) {
      await this.prismaClient.streamingContent.upsert({
        where: {
          contentTypeName_title_releaseDate: {
            contentTypeName: streamContent.contentTypeName,
            title: streamContent.title,
            releaseDate: streamContent.releaseDate as Date,
          },
        },
        create: streamContent,
        update: {
          id: streamContent.id,
          releaseDate: streamContent.releaseDate,
          imdbRating: streamContent.imdbRating,
          duration: streamContent.duration,
          storyline: streamContent.storyline,
        },
      });
    }

    return data;
  }
}

export default StreamingContentSeed;
