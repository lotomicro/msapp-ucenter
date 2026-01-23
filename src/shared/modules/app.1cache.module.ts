import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IORedisModuleOptions, IORedisMQModule } from '@tsailab/ioredis-mq';

@Global()
@Module({
  imports: [
    IORedisMQModule.forRootAsync(
      {
        useFactory: (config: ConfigService) => {
          const ioredisOpts = config.get('cache.ioredis');
          if (!ioredisOpts)
            throw new Error(
              `IORedis configuration error.Please check yaml key [cache.ioredis]`,
            );

          return ioredisOpts as unknown as IORedisModuleOptions;
        },
        inject: [ConfigService],
        extraProviders: [],
      },
      true,
    ),
  ],
  providers: [],
  exports: [],
})
export class AppCacheModule {}
