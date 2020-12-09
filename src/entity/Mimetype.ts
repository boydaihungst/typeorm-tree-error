import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  PrimaryColumn,
  OneToOne,
  Column,
} from 'typeorm';
import { CustomBaseEntity } from './Base';
import { Imgbb } from './Imgbb';

@Entity()
export class Mimetype extends CustomBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'nvarchar',
    length: 255,
    nullable: false,
    unique: true,
    transformer: {
      from: (val: string) => val?.toLowerCase(),
      to: (val: string) => val?.toLowerCase(),
    },
  })
  value: string;

  @OneToMany(() => Imgbb, (x) => x.mimetype, { nullable: true })
  imgbbs?: Imgbb[];
}
