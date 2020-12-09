import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CustomBaseEntity } from './Base';
import { File } from './File';

@Entity()
export class FilePartial extends CustomBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  fileId: string;

  @ManyToOne(() => File, (x) => x.partials, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  file: File;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  partFileId: string;

  @Column({
    type: 'tinyint',
    nullable: false,
    unsigned: true,
  })
  partIndex: number;
}
