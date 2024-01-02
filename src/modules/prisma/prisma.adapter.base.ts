import {
  plainToInstance,
  ClassConstructor,
  ClassTransformOptions,
} from 'class-transformer';
import { PrismaService } from './prisma.service';

export type BaseOptions<E extends object> = {
  classTransformOptions?: ClassTransformOptions;
  transformResponse?: boolean;
  select?: Record<keyof E, boolean>;
  include?: Record<string, any>;
};

export type FindOptions<E extends object> = BaseOptions<E>;

export type FindOneOptions<E extends object> = BaseOptions<E> & {
  throwIfNotExists?: boolean;
};

export type CreateOptions<E extends object> = BaseOptions<E> & {
  include?: Record<string, any>;
};

export type UpdateOptions<E extends object> = BaseOptions<E> & {
  include?: Record<string, any>;
};

export type DeleteOptions<E extends object> = BaseOptions<E>;

export type ModelInput = Record<string, any>;

export type EntityId<T = string> = T;

type OrderByType<T> = {
  [K in keyof T]: {
    [P in K]: 'asc' | 'desc';
  };
}[keyof T];

export interface PrismaBaseInterface<
  E extends object = any,
  R extends ClassConstructor<E> = any,
> {
  count(): number | Promise<number>;

  find<Response extends E | R = any>(
    options?: FindOptions<E>,
  ): Response[] | Promise<Response[]>;

  findOne<Response extends E | R = any>(
    id: EntityId,
    options?: FindOneOptions<E>,
  ): Response | Promise<Response>;

  create<Response extends E | R = any>(
    input: ModelInput,
    options?: CreateOptions<E>,
  ): Response | Promise<Response>;

  update<Response extends E | R = any>(
    id: EntityId,
    input: ModelInput,
    options?: UpdateOptions<E>,
  ): Response | Promise<Response>;

  delete<Response extends E | R = any>(
    id: EntityId,
    options?: DeleteOptions<E>,
  ): Response | Promise<Response>;
}

export class PrismaAdapterBase<
  Entity extends object = any,
  Response extends ClassConstructor<Entity> = any,
> implements PrismaBaseInterface<Entity, Response>
{
  protected classToResponse?: Response;
  protected orderBy?: Array<OrderByType<Entity>>;

  constructor(
    protected readonly model: PrismaService,
    protected readonly modelName: string,
  ) {}

  protected transformResponse(
    entity: Entity,
    options?: ClassTransformOptions,
  ): Entity | Response {
    return typeof this.classToResponse !== 'undefined'
      ? plainToInstance(this.classToResponse, entity, {
          strategy: 'excludeAll',
          exposeDefaultValues: false,
          exposeUnsetFields: false,
          ...(options || {}),
        })
      : entity;
  }

  public async count(): Promise<number> {
    return this.model[this.modelName].count();
  }

  public async find<Response = Entity>(
    options?: FindOptions<Entity>,
  ): Promise<Response[]> {
    const { transformResponse = true, select = undefined } = options;
    const results = await this.model[this.modelName].findMany({
      orderBy: this.orderBy,
      select,
    });

    return transformResponse
      ? this.transformResponse(results, options?.classTransformOptions)
      : results;
  }

  public async findOne<Response = Entity>(
    id: EntityId,
    options: FindOneOptions<Entity> = {},
  ): Promise<Response> {
    const where = { id };

    const { transformResponse = true, throwIfNotExists = false } = options;

    const result = throwIfNotExists
      ? await this.model[this.modelName].findFirstOrThrow({
          where,
        })
      : await this.model[this.modelName].findFirst({
          where,
        });

    return transformResponse
      ? this.transformResponse(result, options?.classTransformOptions)
      : result;
  }

  public async create<Response = any>(
    input: ModelInput,
    options: CreateOptions<Entity> = {},
  ): Promise<Response> {
    const { transformResponse = true, include = undefined } = options;

    const result = await this.model[this.modelName].create({
      data: input,
      include,
    });

    return transformResponse
      ? this.transformResponse(result, options?.classTransformOptions)
      : result;
  }

  public async update<Response = any>(
    id: EntityId,
    input: ModelInput,
    options: UpdateOptions<Entity> = {},
  ): Promise<Response> {
    const { transformResponse = true, include = undefined } = options;
    const result = await this.model[this.modelName].update({
      data: input,
      where: { id },
      include,
    });

    return transformResponse
      ? this.transformResponse(result, options?.classTransformOptions)
      : result;
  }

  public async delete<Response = any>(
    id: EntityId,
    options: DeleteOptions<Entity> = {},
  ): Promise<Response> {
    const { transformResponse = false } = options;
    const result = await this.model[this.modelName].delete({
      where: id,
    });

    return transformResponse
      ? this.transformResponse(result, options?.classTransformOptions)
      : result;
  }
}
