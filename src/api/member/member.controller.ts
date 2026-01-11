import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UCenterModuleRoutes } from '../ucenter.api.routes';
import { RpcBizException } from '@lotomic/core';

@ApiTags(`${UCenterModuleRoutes.Member.name}`)
@Controller('member')
export class MemberController {
  constructor() {}

  @ApiOperation({ description: '获取会员Profile信息' })
  @Get('profile/:id')
  getMemberProfile(@Param('id') id: number) {
    throw RpcBizException.createUnImplementRpcError(
      `${UCenterModuleRoutes.Member.name}`,
    );
  }
}
