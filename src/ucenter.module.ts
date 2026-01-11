import { Module } from '@nestjs/common';
import { UcenterController } from './ucenter.controller';
import { UcenterService } from './ucenter.service';
import { SharedModule } from './shared/shared.module';
import { ApiModule } from './api/api.module';
import { AppConfigModule } from './shared/app.config.module';

@Module({
  imports: [AppConfigModule, SharedModule, ApiModule],
  controllers: [UcenterController],
  providers: [UcenterService],
})
export class UcenterModule {}
