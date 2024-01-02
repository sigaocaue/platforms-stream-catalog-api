import { Expose } from 'class-transformer';

export class StreamingContentDto {
  constructor(partial: Partial<StreamingContentDto>) {
    Object.assign(this, partial);
  }

  @Expose()
  id: string;

  @Expose()
  contentTypeName: string;

  @Expose()
  title: string;

  @Expose()
  releaseDate: string;

  @Expose()
  imdbRating: number;

  @Expose()
  duration: number;

  @Expose()
  storyline?: string;
}
