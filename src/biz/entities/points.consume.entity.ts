import { CommonEntity } from '@lotomic/core';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'loto_point_consume_record',
  comment: '积分消费记录',
})
export class PointConsumeRecordEntity extends CommonEntity {
  earnedId: number;

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
    name: 'cost_points',
    default: 0,
    unsigned: true,
    comment: '消费积分',
  })
  costPoints: number;
}
