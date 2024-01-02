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
  CreateForeignContentTitleDto,
  ForeignContentTitleDto,
  UpdateForeignContentTitleDto,
} from '../dtos';
import { ForeignContentTitleService } from '../services';

@Controller('foreign-contents-titles')
export class ForeignContentTitleController {
  constructor(protected readonly service: ForeignContentTitleService) {}

  @Get()
  public async find(): Promise<ForeignContentTitleDto[]> {
    return this.service.find();
  }

  @Get(':id')
  public async findOne(
    @Param('id')
    id: string,
  ): Promise<ForeignContentTitleDto> {
    return this.service.findOne(id, {
      throwIfNotExists: true,
    });
  }

  @Post()
  public async create(
    @Body()
    streamingContent: CreateForeignContentTitleDto,
  ): Promise<ForeignContentTitleDto> {
    return this.service.create(streamingContent);
  }

  @Patch(':id')
  public async update(
    @Param('id')
    id: string,
    @Body()
    streamingContent: UpdateForeignContentTitleDto,
  ): Promise<ForeignContentTitleDto> {
    return this.service.update(id, streamingContent);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(
    @Param('id')
    id: string,
  ): Promise<ForeignContentTitleDto> {
    return this.service.delete(id);
  }
}
