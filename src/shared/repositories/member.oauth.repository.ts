import { CommonRepository, MemberOauthEntity } from '@lotomic/core';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MemberOAuthRepository extends CommonRepository<MemberOauthEntity> {
  constructor(
    @InjectRepository(MemberOauthEntity)
    private readonly entityWrapper: Repository<MemberOauthEntity>,
  ) {
    super(entityWrapper);
  }
}
