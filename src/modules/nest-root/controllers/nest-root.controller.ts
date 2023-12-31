import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

@Controller()
export class NestRootController {
  @Get()
  @HttpCode(HttpStatus.NO_CONTENT)
  public main(): undefined {
    return undefined;
  }
}
