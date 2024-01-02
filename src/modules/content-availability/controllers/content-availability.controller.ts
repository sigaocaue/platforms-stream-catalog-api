import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  CreateContentAvailabilityDto,
  ContentAvailabilityDto,
  UpdateContentAvailabilityDto,
} from '../dtos';
import { ContentAvailabilityService } from '../services';

@Controller('content-availabilities')
export class ContentAvailabilityController {
  constructor(protected readonly service: ContentAvailabilityService) {}

  @Get()
  public async find(): Promise<ContentAvailabilityDto[]> {
    return this.service.find();
  }

  @Get(':id')
  public async findOne(
    @Param('id')
    id: string,
  ): Promise<ContentAvailabilityDto> {
    return this.service.findOne(id, {
      throwIfNotExists: true,
    });
  }

  @Post()
  public async create(
    @Body()
    streamingContent: CreateContentAvailabilityDto,
  ): Promise<ContentAvailabilityDto> {
    return this.service.create(streamingContent);
  }

  @Patch(':id')
  public async update(
    @Param('id')
    id: string,
    @Body()
    streamingContent: UpdateContentAvailabilityDto,
  ): Promise<ContentAvailabilityDto> {
    return this.service.update(id, streamingContent);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(
    @Param('id')
    id: string,
  ): Promise<ContentAvailabilityDto> {
    return this.service.delete(id);
  }
}
