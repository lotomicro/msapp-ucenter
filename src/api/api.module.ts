import { Module } from '@nestjs/common';
import { MemberController } from './member/member.controller';

@Module({
  controllers: [MemberController]
})
export class ApiModule {}
