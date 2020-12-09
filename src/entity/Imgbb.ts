import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { CustomBaseEntity } from './Base';
import { FileExtension } from './FileExtension';
import { Mimetype } from './Mimetype';
import { User } from './User';

@Entity()
export class Imgbb extends CustomBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'nvarchar', length: 255, nullable: false })
  fileName: string;

  @Column({ type: 'nvarchar', length: 2048, nullable: false })
  url: string;

  @Column({ type: 'nvarchar', length: 2048, nullable: false })
  thumbnailUrl: string;

  @Column({ nullable: true })
  mimetypeId?: string;

  @ManyToOne(() => Mimetype, (x) => x.imgbbs, {})
  mimetype?: Mimetype;

  @Column({ nullable: true })
  extensionId?: string;

  @ManyToOne(() => FileExtension, (x) => x.imgbbs, { nullable: false })
  extension?: FileExtension;

  @Column({
    type: 'int',
    nullable: false,
    unsigned: true,
    default: 0,
  })
  size: number;
}
