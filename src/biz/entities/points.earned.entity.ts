import { CommonEntity } from '@lotomic/core';
import { Transform, Type } from 'class-transformer';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'loto_points_earned_record',
  comment: '会员计分获取记录',
})
export class PointEarnedRecordEntity extends CommonEntity {
  @Column({
    name: 'uid',
    type: 'bigint',
    nullable: false,
    comment: '会员ID',
  })
  @Type(() => Number)
  @Transform(({ value }) => Number(value))
  uid: number;

  @Column({
    name: 'userno',
    type: 'varchar',
    length: 30,
    comment: '会员编码',
  })
  userno: string;

  @Column({
    name: 'orderno',
    type: 'varchar',
    length: 30,
    comment: '会员编码',
  })
  orderno: string;

  @Column({
    type: 'varchar',
    length: 30,
    name: 'order_type',
    comment: '订单类型:商城,游戏',
  })
  orderType: string;

  @Column({
    type: 'int',
    name: 'orginal_points',
    nullable: false,
    unsigned: true,
    comment: '赚取的原始积分',
  })
  orginalPoints: number;

  @Column({
    type: 'int',
    name: 'points',
    default: 0,
    unsigned: true,
    comment: '有效积分',
  })
  points: number;

  @Column({
    name: 'summary',
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: '积分获取摘要',
  })
  summary: string;
}
