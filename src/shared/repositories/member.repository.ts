import { CommonRepository, MemberEntity } from '@lotomic/core';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MemberRepository extends CommonRepository<MemberEntity> {
  constructor(
    @InjectRepository(MemberEntity)
    private readonly memberRepo: Repository<MemberEntity>,
  ) {
    super(memberRepo);
  }
}
