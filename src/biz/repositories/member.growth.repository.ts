import { CommonRepository } from '@lotomic/core';
import { MemberGrowthEntity } from '../entities';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class MemberGrowthRepository extends CommonRepository<MemberGrowthEntity> {
  constructor(private readonly entityWrapper: Repository<MemberGrowthEntity>) {
    super(entityWrapper);
  }
}
