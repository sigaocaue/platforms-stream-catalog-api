import { Controller, Get, HttpCode } from '@nestjs/common';

@Controller()
export class NestRootController {
  @Get()
  @HttpCode(204)
  public main(): undefined {
    return undefined;
  }
}
