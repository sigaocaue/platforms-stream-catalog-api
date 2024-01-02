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
import { CreatePersonDto, PersonDto, UpdatePersonDto } from '../dtos';
import { PersonService } from '../services';

@Controller('persons')
export class PersonController {
  constructor(protected readonly service: PersonService) {}

  @Get()
  public async find(): Promise<PersonDto[]> {
    return this.service.find();
  }

  @Get(':id')
  public async findOne(
    @Param('id')
    id: string,
  ): Promise<PersonDto> {
    return this.service.findOne(id, {
      throwIfNotExists: true,
    });
  }

  @Post()
  public async create(
    @Body()
    streamingContent: CreatePersonDto,
  ): Promise<PersonDto> {
    return this.service.create(streamingContent);
  }

  @Patch(':id')
  public async update(
    @Param('id')
    id: string,
    @Body()
    streamingContent: UpdatePersonDto,
  ): Promise<PersonDto> {
    return this.service.update(id, streamingContent);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(
    @Param('id')
    id: string,
  ): Promise<PersonDto> {
    return this.service.delete(id);
  }
}
