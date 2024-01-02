import {
  PrismaAdapterBase,
  PrismaBaseInterface,
  PrismaService,
} from '@modules/prisma';
import { Injectable } from '@nestjs/common';
import { CreatePersonDto, PersonDto, UpdatePersonDto } from '../dtos';
import { PersonEntity } from '../entities/person.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class PersonService
  extends PrismaAdapterBase<PersonEntity>
  implements PrismaBaseInterface
{
  constructor(protected readonly prismaService: PrismaService) {
    super(prismaService, 'streamingContent');
    this.orderBy = [
      { name: 'asc' },
      { nationality: 'asc' },
      { birthDate: 'desc' },
      { createdAt: 'desc' },
    ];
    this.classToResponse = PersonDto;
  }

  public async create<PersonDto>(input: CreatePersonDto): Promise<PersonDto> {
    const { contentContributions, ...person } = input;

    return super.create({
      ...person,
      contentContributions:
        Array.isArray(contentContributions) && contentContributions.length > 0
          ? {
              createMany: {
                data: contentContributions,
                skipDuplicates: true,
              },
            }
          : undefined,
    } as Prisma.PersonCreateInput);
  }

  public async update<PersonDto>(
    id: string,
    input: UpdatePersonDto,
  ): Promise<PersonDto> {
    return super.update(id, input);
  }
}
