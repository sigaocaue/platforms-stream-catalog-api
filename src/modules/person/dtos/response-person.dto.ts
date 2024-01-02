import { Expose, Transform } from 'class-transformer';
import moment from 'moment';

export class PersonDto {
  constructor(partial: Partial<PersonDto>) {
    Object.assign(this, partial);
  }

  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  pseudonym: string | null;

  @Expose()
  @Transform(({ value }) =>
    value instanceof Date ? moment(value).toISOString() : value,
  )
  birthDate: Date | string | null;

  @Expose()
  nationality: string | null;
}
