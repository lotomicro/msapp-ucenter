import {
  APP_CONFIG_PATH_MAP,
  AppConfigPathMap,
  MYSQL_OPTIONS_ROOT_PROVIDER_KEY,
  yamlConfigLoader,
} from '@lotomic/core';
import { Global, Module, ValueProvider } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MSAPP_ROOT_PREFIX } from '.';

/**
 * use db.yml
 * root loto-msdb
 */
const mysqlMultiRootkeyProvider: ValueProvider<string> = {
  provide: MYSQL_OPTIONS_ROOT_PROVIDER_KEY,
  useValue: 'mysql',
};

const msappConfPathMapProvider: ValueProvider<AppConfigPathMap> = {
  provide: APP_CONFIG_PATH_MAP,
  useValue: {
    appRoot: MSAPP_ROOT_PREFIX,
  },
};

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      cache: false,
      isGlobal: true,
      load: [yamlConfigLoader],
      validationOptions: {
        allowUnknow: true,
        abortEarly: true,
      },
    }),
  ],
  providers: [mysqlMultiRootkeyProvider, msappConfPathMapProvider],
  exports: [MYSQL_OPTIONS_ROOT_PROVIDER_KEY, APP_CONFIG_PATH_MAP],
})
export class AppInitializeModule {}
