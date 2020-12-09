import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { CustomBaseEntity } from './Base';
import { FileFolderBase } from './FileFolderBase';
import { UploadSession } from './UploadSession';
import { User } from './User';

@Entity()
export class TemporaryUrl extends CustomBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'nvarchar', length: 2000, nullable: false })
  url: string;

  @Column({ nullable: false })
  ownerId?: string;

  @ManyToOne(() => User, (x) => x.temporaryUrls, { nullable: false })
  owner?: User;

  @Column({ type: 'boolean', nullable: false, default: false })
  isPreviewLink?: boolean;

  @Column({ type: 'boolean', nullable: false, default: false })
  isDownloadLink?: boolean;

  @Column({ type: 'boolean', nullable: false, default: false })
  isShareUrl?: boolean;

  @Column({ type: 'boolean', nullable: false, default: false })
  isUploadLink?: boolean;

  @Column({ type: 'boolean', nullable: false, default: false })
  isResetPwLink?: boolean;

  @Column({ type: 'datetime', nullable: true })
  expiredAt?: Date;

  @OneToOne(() => UploadSession, (x) => x.uploadUrl, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  uploadSession?: UploadSession;

  @OneToOne(() => FileFolderBase, (x) => x.shareUrl, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  shareUrlOffile?: FileFolderBase;
}
