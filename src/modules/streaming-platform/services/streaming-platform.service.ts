import {
  PrismaAdapterBase,
  PrismaBaseInterface,
  PrismaService,
} from '@modules/prisma';
import { Injectable } from '@nestjs/common';
import { StreamingPlatformDto } from '../dtos';
import { StreamingPlatformEntity } from '../entities';

@Injectable()
export class StreamingPlatformService
  extends PrismaAdapterBase<StreamingPlatformEntity>
  implements PrismaBaseInterface
{
  constructor(protected readonly prismaService: PrismaService) {
    super(prismaService, 'streamingContent');
    this.orderBy = [{ name: 'asc' }, { createdAt: 'desc' }];
    this.classToResponse = StreamingPlatformDto;
  }
}
