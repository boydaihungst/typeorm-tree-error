import { IsOptional, IsString, ValidateNested } from 'class-validator';
import {
  Column,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Index,
  ChildEntity,
  Tree,
} from 'typeorm';
import { FilePartial } from './FilePartial';
import { Mimetype } from './Mimetype';
import { FileFolderBase } from './FileFolderBase';
import { FILE_TAG } from '../helpers/enum';

@ChildEntity()
@Index(['tag'])
@Tree('closure-table')
export class File extends FileFolderBase {
  @Column({ type: 'boolean', default: false, nullable: false })
  @IsOptional()
  isPreviewable: boolean;

  @Column({
    type: 'int',
    nullable: false,
    unsigned: true,
    default: 0,
  })
  @IsOptional()
  size: number;

  @Column({
    type: 'int',
    unsigned: true,
    nullable: true,
  })
  height?: number;

  @Column({
    type: 'int',
    unsigned: true,
    nullable: true,
  })
  width?: number;

  @Column({ type: 'uuid', nullable: true })
  @IsOptional()
  mimetypeId: string;

  @ManyToOne(() => Mimetype, {
    nullable: true,
  })
  @JoinColumn()
  @IsOptional()
  @ValidateNested()
  mimetype: Mimetype;

  @Column({
    type: 'enum',
    enum: FILE_TAG,
    default: FILE_TAG.UNKNOWN,
    nullable: false,
  })
  tag: FILE_TAG;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  extensionId: string;

  @OneToMany(() => FilePartial, (x) => x.file, {
    nullable: true,
  })
  @IsOptional()
  partials: FilePartial[];

  // @Field(() => Folder, { nullable: false })
  // @TreeParent({ onDelete: 'CASCADE' })
  // parentFolder: Folder;
}
