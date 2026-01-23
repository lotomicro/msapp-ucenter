import { Module } from '@nestjs/common';
import { UcenterController } from './ucenter.controller';
import { UcenterService } from './ucenter.service';
import {
  AppCacheModule,
  AppDatabaseModule,
  AppInitializeModule,
} from './shared/modules';

@Module({
  imports: [
    AppInitializeModule,
    AppCacheModule,
    AppDatabaseModule,

    //share end
  ],
  controllers: [UcenterController],
  providers: [UcenterService],
})
export class UcenterModule {}
