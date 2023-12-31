import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckResult } from '@nestjs/terminus';
import { HealthService } from '../services';

@Controller('health')
export class HealthController {
  constructor(protected readonly healthService: HealthService) {}

  @Get()
  @HealthCheck()
  public async check(): Promise<HealthCheckResult> {
    return this.healthService.healthCheck();
  }
}
