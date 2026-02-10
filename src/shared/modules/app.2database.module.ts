import {
  MemberEntity,
  MemberOauthEntity,
  MemberProfileEntity,
  MysqlOptionsFactory,
} from '@lotomic/core';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  MemberOAuthRepository,
  MemberProfileRepository,
  MemberRepository,
} from '../repositories';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: MysqlOptionsFactory,
    }),
    TypeOrmModule.forFeature([
      MemberEntity,
      MemberProfileEntity,
      MemberOauthEntity,
    ]),
  ],
  providers: [MemberRepository, MemberProfileRepository, MemberOAuthRepository],
  exports: [MemberRepository, MemberProfileRepository, MemberOAuthRepository],
})
export class AppDatabaseModule {}
