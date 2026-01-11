import { NestFactory } from '@nestjs/core';
import { UcenterModule } from './ucenter.module';
import {
  isDevMode,
  LotoAppListener,
  MS_PROVIDER_NAMES,
  msappRedisConfigLoader,
  readPkgJson,
} from '@lotomic/core';
import { ConfigService } from '@nestjs/config';

import chalk from 'chalk';
import helmet from 'helmet';
import { RequestMethod, VersioningType } from '@nestjs/common';
import { MicroserviceOptions, RedisOptions } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const MSAPP_ROOT_PREFIX = 'msapp_ucenter';

async function bootstrap() {
  const listeners: LotoAppListener[] = [];
  const SWAGERR_ENABLE = isDevMode();

  const app = await NestFactory.create(UcenterModule, {});

  const configService = app.get(ConfigService);
  const appPort = configService.get<number>(
    `${MSAPP_ROOT_PREFIX}.server.port`,
    Number(process.env.PORT || 7108),
  );

  const pkgJson = readPkgJson();
  const globalApiPrefix = configService.get<string>(
    `${MSAPP_ROOT_PREFIX}.api.prefix`,
    'uc',
  );

  //允许跨域请求
  await app.enableCors();
  // Web漏洞的
  await app.use(helmet());
  app.setGlobalPrefix(globalApiPrefix, {
    exclude: [
      {
        path: 'check_health',
        method: RequestMethod.GET,
      },
      {
        path: 'health',
        method: RequestMethod.GET,
      },
    ],
  });
  await app.enableVersioning({
    type: VersioningType.URI,
    //  defaultVersion: '1'
  });

  if (SWAGERR_ENABLE) {
    // doc
    const { title, author, url, email } = configService.get<{
      title: string;
      author: string;
      url: string;
      email: string;
    }>('app.swagger', {
      title: `User Center Service API`,
      author: 'lotomic',
      url: 'https://wiki.xtsai.cn',
      email: 'lanbery@gmail.com',
    });
    const { description = '', version = '1.0.0' } = pkgJson;
    const swaggerOptions = new DocumentBuilder()
      .setTitle(title)
      .setDescription(description)
      .setContact(author, url, email)
      .addTag(`doc-${globalApiPrefix}`)
      .setVersion(version)
      .addBearerAuth({ type: 'apiKey', in: 'header', name: 'token' })
      .build();

    const document = SwaggerModule.createDocument(app, swaggerOptions);
    await SwaggerModule.setup(`doc-${globalApiPrefix}`, app, document);

    listeners.push({
      name: `${title} API`,
      url: `http://127.0.0.1:${appPort}/doc-${globalApiPrefix}`,
      sortno: 99,
    });
  }

  // micro service
  const msEnable = configService.get<boolean>(
    `${MSAPP_ROOT_PREFIX}.msconfig.enable`,
    false,
  );
  if (msEnable) {
    let redisOptions: RedisOptions;
    try {
      const loader = msappRedisConfigLoader.load(
        'msapp.yml',
        'msredis',
        '.conf',
      );
      redisOptions = loader.getMsRedisOptions();
      if (isDevMode()) {
        await console.log(
          chalk.yellowBright(
            `Micro Service configuration ${MSAPP_ROOT_PREFIX}.msconfig.enable = true`,
          ),
          redisOptions,
        );
      }
      const microservices =
        app.connectMicroservice<MicroserviceOptions>(redisOptions);

      microservices.status.subscribe({
        next: () => {
          console.log(chalk.magentaBright(`🌸🌸🌸 ✅ Redis 微服务监听成功！`));
        },
        error: (err) => {
          console.log(chalk.redBright('❌ Redis 微服务监听失败：'), err);
        },
      });

      await app.startAllMicroservices();

      listeners.push({
        name: `Msapp [${MS_PROVIDER_NAMES.REDIS_UCENTER_SERVICE}]`,
        url: `MS Redis listen at ${redisOptions.options?.host}:${redisOptions.options?.port} DB: ${redisOptions.options?.db}`,
        sortno: 7,
      });
    } catch (error) {
      console.log(chalk.yellowBright(`Micro Service load error`), error);
      throw error;
    }
  }

  await app.listen(appPort, '0.0.0.0');
  const serverUrl = await app.getUrl();
  listeners.push({
    name: `MSAppHome[${pkgJson?.name}]`,
    url: `${serverUrl}/health`,
    sortno: 0,
  });
  return listeners;
}

bootstrap()
  .then((listeners: Array<LotoAppListener>) => {
    const logger = console.log;

    logger(chalk.magentaBright('🌸🌸🌸🚀🚀🚀🌸🌸🌸'));
    logger(chalk.magentaBright(`用户中心微服务启动完成...\n`));

    listeners
      .sort((a, b) => a.sortno - b.sortno)
      .forEach(({ name, url }) => {
        logger(chalk.cyan(`${name}: `, url));
      });

    logger(chalk.magentaBright('🌸🌸🌸🚀🚀🚀🌸🌸🌸'));
  })
  .catch((error: any) => {
    console.error(error);
    process.exit(1);
  });
