import { CommonEntity } from '@lotomic/core';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'uc_integration_record', comment: '会员积分变更记录' })
export class IntegrationRecordEntity extends CommonEntity {
  @Column({
    name: 'uid',
    type: 'bigint',
    comment: '会员ID',
    nullable: false,
  })
  uid: number;

  @Column({
    name: 'ticketno',
    type: 'varchar',
    length: 64,
    default: '',
    comment: '票据编号',
  })
  ticketno: string;

  @Column({
    name: 'points',
    type: 'int',
    comment: '变更积分',
    default: 0,
    unsigned: true,
  })
  points: number;

  @Column({
    name: 'change_type',
    type: 'tinyint',
    nullable: false,
    default: 0,
    comment: '变更类型: 0-增加, 1-减少',
  })
  changeType: number;

  @Column({
    name: 'summary',
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: '积分变更摘要',
  })
  summary: string;

  @Column({
    name: 'remark',
    type: 'varchar',
    length: 255,
    comment: '积分变更备注（后台）',
  })
  remark: string;

  @Column({
    name: 'expires_at',
    type: 'timestamp',
    nullable: true,
    comment: '积分过期时间',
  })
  expiresAt?: Date;
}
