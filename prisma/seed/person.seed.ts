import { faker } from '@faker-js/faker/locale/pt_BR';
import { PrismaClient, Person } from '@prisma/client';
import { SeedInterface } from './seed.interface';
import { SeedBase } from './seed.base';

export class PersonSeed
  extends SeedBase<Person>
  implements SeedInterface<Person>
{
  constructor(protected readonly prismaClient: PrismaClient) {
    super();
  }

  public async seed(): Promise<Person[]> {
    const persons: Person[] = [
      ...Array.from(
        Array(
          faker.number.int({
            min: 2,
            max: 5,
          }),
        ),
        (): Person => ({
          id: faker.string.uuid(),
          name: faker.person.fullName(),
          pseudonym: faker.datatype.boolean() ? faker.person.firstName() : null,
          birthDate: faker.datatype.boolean() ? faker.date.past() : null,
          nationality: faker.location.country(),
          createdAt: new Date(),
        }),
      ),
      {
        id: 'bradley-cooper',
        name: 'Bradley Cooper',
        pseudonym: null,
        birthDate: null,
        nationality: null,
        createdAt: new Date(),
      },
      {
        id: 'todd-phillips',
        name: 'Todd Phillips',
        pseudonym: null,
        birthDate: null,
        nationality: null,
        createdAt: new Date(),
      },
      {
        id: 'joaquin-phoenix',
        name: 'Joaquin Phoenix',
        pseudonym: null,
        birthDate: null,
        nationality: null,
        createdAt: new Date(),
      },
      {
        id: 'zach-galifianakis',
        name: 'Zach Galifianakis',
        pseudonym: null,
        birthDate: null,
        nationality: null,
        createdAt: new Date(),
      },
      {
        id: 'ed-helms',
        name: 'Edward Paul',
        pseudonym: 'Ed Helms',
        birthDate: null,
        nationality: null,
        createdAt: new Date(),
      },
    ];

    for (const { id, ...person } of persons) {
      await this.prismaClient.person.upsert({
        where: {
          id: id,
        },
        create: {
          id,
          ...person,
        },
        update: person,
      });
    }

    return persons;
  }
}

export default PersonSeed;
