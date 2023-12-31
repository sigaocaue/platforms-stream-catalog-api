import { Prisma } from '@prisma/client';
import { SeedInterface } from './seed.interface';

export abstract class SeedBase<T = any> implements SeedInterface<T> {
  abstract seed(): Promise<T> | Promise<T[]>;

  protected async truncateTable(model: {
    deleteMany: (args?: {
      where?: any;
    }) => Prisma.PrismaPromise<Prisma.BatchPayload>;
  }): Promise<Prisma.BatchPayload> {
    return model.deleteMany({});
  }
}
