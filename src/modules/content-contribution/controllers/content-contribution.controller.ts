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
  CreateContentContributionDto,
  ContentContributionDto,
  UpdateContentContributionDto,
} from '../dtos';
import { ContentContributionService } from '../services';

@Controller('content-contributions')
export class ContentContributionController {
  constructor(protected readonly service: ContentContributionService) {}

  @Get()
  public async find(): Promise<ContentContributionDto[]> {
    return this.service.find();
  }

  @Get(':id')
  public async findOne(
    @Param('id')
    id: string,
  ): Promise<ContentContributionDto> {
    return this.service.findOne(id, {
      throwIfNotExists: true,
    });
  }

  @Post()
  public async create(
    @Body()
    streamingContent: CreateContentContributionDto,
  ): Promise<ContentContributionDto> {
    return this.service.create(streamingContent);
  }

  @Patch(':id')
  public async update(
    @Param('id')
    id: string,
    @Body()
    streamingContent: UpdateContentContributionDto,
  ): Promise<ContentContributionDto> {
    return this.service.update(id, streamingContent);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(
    @Param('id')
    id: string,
  ): Promise<ContentContributionDto> {
    return this.service.delete(id);
  }
}
