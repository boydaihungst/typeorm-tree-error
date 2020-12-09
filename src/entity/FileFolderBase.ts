import { IsOptional, MaxLength, ValidateNested } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne,
  OneToMany,
  Tree,
  Index,
  TableInheritance,
  JoinColumn,
  TreeParent,
  TreeChildren,
} from 'typeorm';
import { CustomBaseEntity } from './Base';
import { FileStatistic } from './FileStatistic';
import { User } from './User';
import { FILE_TYPE } from '../helpers/enum';
import { TemporaryUrl } from './TemporaryUrl';
import { UploadSession } from './UploadSession';

@Entity('file_folder')
@TableInheritance({ column: { type: 'enum', name: 'type', enum: FILE_TYPE } })
@Tree('closure-table')
@Index(['name'], { fulltext: true })
export class FileFolderBase extends CustomBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'nvarchar', length: 255, nullable: false })
  @MaxLength(255, { message: 'FIELD_LENGTH_MAX' })
  name: string;

  @Column({ type: 'boolean', default: false, nullable: false })
  isPublic: boolean;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: false })
  @IsOptional()
  ownerId: string;

  @ManyToOne(() => User, (x) => x.ownedFiles, {
    nullable: false,
  })
  @ValidateNested()
  owner: User;

  @TreeChildren({ cascade: ['soft-remove', 'remove', 'recover'] })
  childrens: FileFolderBase[];

  @TreeParent({ onDelete: 'CASCADE' })
  parentFolder: FileFolderBase;

  @Column({ nullable: false })
  @IsOptional()
  lastModifierId: string;

  @ManyToOne(() => User, (x) => x.modifiedFiles, {
    nullable: false,
  })
  @ValidateNested()
  lastModifier: User;

  @Column({ nullable: true })
  shareUrlId: string;

  @OneToOne(() => TemporaryUrl, (x) => x.shareUrlOffile, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  shareUrl: TemporaryUrl;

  @Column({ type: 'datetime', nullable: true })
  keepTrashUntilDate: Date;

  @OneToOne(() => FileStatistic, (x) => x.file, {
    onDelete: 'CASCADE',
    cascade: true,
    nullable: true,
  })
  @JoinColumn()
  @IsOptional()
  @ValidateNested()
  statistic: FileStatistic;

  @Column({ type: 'enum', enum: FILE_TYPE })
  type: FILE_TYPE;

  @OneToMany(() => UploadSession, (x) => x.parentFolder, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  uploadSessions: UploadSession[];
}
