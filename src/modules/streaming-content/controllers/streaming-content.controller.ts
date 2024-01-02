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
  CreateStreamingContentDto,
  UpdateStreamingContentDto,
  StreamingContentDto,
} from '../dtos';
import { StreamingContentService } from '../services';

@Controller('streaming-content')
export class StreamingContentController {
  constructor(
    protected readonly streamingContentService: StreamingContentService,
  ) {}

  @Get()
  public async find(): Promise<StreamingContentDto[]> {
    return this.streamingContentService.find();
  }

  @Get(':id')
  public async findOne(
    @Param('id')
    id: string,
  ): Promise<StreamingContentDto> {
    return this.streamingContentService.findOne(id, {
      throwIfNotExists: true,
    });
  }

  @Post()
  public async create(
    @Body()
    streamingContent: CreateStreamingContentDto,
  ): Promise<StreamingContentDto> {
    return this.streamingContentService.create(streamingContent);
  }

  @Patch(':id')
  public async update(
    @Param('id')
    id: string,
    @Body()
    streamingContent: UpdateStreamingContentDto,
  ): Promise<StreamingContentDto> {
    return this.streamingContentService.update(id, streamingContent);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(
    @Param('id')
    id: string,
  ): Promise<StreamingContentDto> {
    return this.streamingContentService.delete(id);
  }
}
