import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { CustomBaseEntity } from './Base';
import { FileFolderBase } from './FileFolderBase';
import { Mimetype } from './Mimetype';
import { TemporaryUrl } from './TemporaryUrl';
import { UploadFilePartial } from './UploadFilePartial';
import { User } from './User';
@Entity()
export class UploadSession extends CustomBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'nvarchar', length: 255, nullable: false })
  fileName: string;

  @Column({ type: 'nvarchar', length: 255, nullable: false })
  userIP: string;

  @Column({ type: 'nvarchar', length: 2000, nullable: true })
  token: string;

  @Column({
    type: 'int',
    nullable: false,
    unsigned: true,
    default: 0,
  })
  fileSize: number;

  @Column({
    type: 'int',
    nullable: false,
    unsigned: true,
    default: 0,
  })
  uploadedBytes: number;

  @Column({ nullable: false })
  ownerId: string;

  @ManyToOne(() => User, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  @Column({ nullable: false })
  parentFolderId: string;

  @ManyToOne(() => FileFolderBase, (x) => x.uploadSessions, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  parentFolder: FileFolderBase;

  @Column({ nullable: true })
  uploadUrlId?: string;

  @OneToOne(() => TemporaryUrl, (x) => x.uploadSession, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  uploadUrl?: TemporaryUrl;

  @Column({ nullable: true })
  mimetypeId?: string;

  @ManyToOne(() => Mimetype, { nullable: true })
  @JoinColumn()
  mimetype?: Mimetype;

  @OneToMany(() => UploadFilePartial, (x) => x.uploadSession)
  uploadPartials?: UploadFilePartial[];
}
