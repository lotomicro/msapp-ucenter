import {
  MSAPP_CONFIG_ROOTKEYS_PROVIDER,
  MsappConfigRootkeys,
  yamlConfigLoader,
} from '@lotomic/core';
import { Global, Module, ValueProvider } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

const msappConfRootkeysProvider: ValueProvider<MsappConfigRootkeys> = {
  provide: MSAPP_CONFIG_ROOTKEYS_PROVIDER,
  useValue: {
    msappRootKey: 'msapp_ucenter',
    msdbRootKey: 'mysql',
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
  providers: [msappConfRootkeysProvider],
  exports: [msappConfRootkeysProvider],
})
export class AppConfigModule {}
