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
  CreateStreamingPlatformDto,
  UpdateStreamingPlatformDto,
  StreamingPlatformDto,
} from '../dtos';
import { StreamingPlatformService } from '../services';

@Controller('streaming-platforms')
export class StreamingPlatformController {
  constructor(protected readonly service: StreamingPlatformService) {}

  @Get()
  public async find(): Promise<StreamingPlatformDto[]> {
    return this.service.find();
  }

  @Get(':id')
  public async findOne(
    @Param('id')
    id: string,
  ): Promise<StreamingPlatformDto> {
    return this.service.findOne(id, {
      throwIfNotExists: true,
    });
  }

  @Post()
  public async create(
    @Body()
    streamingContent: CreateStreamingPlatformDto,
  ): Promise<StreamingPlatformDto> {
    return this.service.create(streamingContent);
  }

  @Patch(':id')
  public async update(
    @Param('id')
    id: string,
    @Body()
    streamingContent: UpdateStreamingPlatformDto,
  ): Promise<StreamingPlatformDto> {
    return this.service.update(id, streamingContent);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(
    @Param('id')
    id: string,
  ): Promise<StreamingPlatformDto> {
    return this.service.delete(id);
  }
}
