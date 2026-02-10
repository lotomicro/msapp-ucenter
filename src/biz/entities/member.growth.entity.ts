import { CommonEntity, } from '@lotomic/core';
import { Column, Entity,  } from 'typeorm';

@Entity({ name: 'uc_member_growth', comment: '会员积分信息' })
export class MemberGrowthEntity extends CommonEntity {
  @Column({
    name: 'uid',
    type: 'bigint',
    comment: '会员ID',
    nullable: false,
  })
  uid: number;

  @Column({
    name: 'points',
    type: 'int',
    comment: '会员积分',
    default: 0,
    unsigned: true,
  })
  points: number;

  @Column({
    name: 'growth',
    type: 'int',
    comment: '会员成长值',
    default: 0,
    unsigned: true,
  })
  growth: number;

  @Column({
    name: 'level',
    type: 'int',
    comment: '会员等级',
    default: 0,
    unsigned: true,
  })
  level: number;
}
