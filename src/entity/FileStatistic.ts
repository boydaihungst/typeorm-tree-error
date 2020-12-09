import {
  Entity,
  Column,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CustomBaseEntity } from './Base';
import { FileFolderBase } from './FileFolderBase';

@Entity()
export class FileStatistic extends CustomBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'int',
    nullable: false,
    unsigned: true,
    default: 0,
  })
  downloaded: number;

  @Column({
    type: 'int',
    nullable: false,
    unsigned: true,
    default: 0,
  })
  viewed?: number;

  @OneToOne(() => FileFolderBase, (x) => x.statistic, {
    nullable: false,
    primary: true,
    onDelete: 'CASCADE',
  })
  file: FileFolderBase;
}
