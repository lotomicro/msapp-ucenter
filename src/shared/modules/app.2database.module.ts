import {
  MemberEntity,
  MemberProfileEntity,
  MysqlOptionsFactory,
} from '@lotomic/core';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberProfileRepository, MemberRepository } from '../repositories';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: MysqlOptionsFactory,
    }),
    TypeOrmModule.forFeature([MemberEntity, MemberProfileEntity]),
  ],
  providers: [MemberRepository, MemberProfileRepository],
  exports: [MemberRepository, MemberProfileRepository],
})
export class AppDatabaseModule {}
