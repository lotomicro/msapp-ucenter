import { CommonRepository, MemberProfileEntity } from '@lotomic/core';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MemberProfileRepository extends CommonRepository<MemberProfileEntity> {
  constructor(
    @InjectRepository(MemberProfileEntity)
    private readonly memProfileRepo: Repository<MemberProfileEntity>,
  ) {
    super(memProfileRepo);
  }
}
