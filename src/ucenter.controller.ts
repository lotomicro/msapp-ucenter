import { Controller, Get } from '@nestjs/common';
import { UcenterService } from './ucenter.service';
import { MS_PROVIDER_NAMES } from '@lotomic/core';

@Controller()
export class UcenterController {
  constructor(private readonly ucenterService: UcenterService) {}

  @Get('health')
  health(): string {
    return `🏃‍♂️‍➡️🏃‍♂️‍➡️🏃‍♂️‍➡️${MS_PROVIDER_NAMES.REDIS_UCENTER_SERVICE} is ready! ${new Date().toISOString()}`;
  }
}
