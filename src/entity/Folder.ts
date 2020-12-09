import { Column, ChildEntity, Tree } from 'typeorm';
import { FOLDER_ICON } from '../helpers/enum';
import { FileFolderBase } from './FileFolderBase';

@ChildEntity()
@Tree('closure-table')
export class Folder extends FileFolderBase {
  @Column({ type: 'boolean', nullable: false, default: false })
  isRoot?: boolean;

  @Column({
    type: 'enum',
    enum: FOLDER_ICON,
    default: FOLDER_ICON.DEFAULT,
  })
  icon: FOLDER_ICON;

  @Column({ type: 'varchar', length: 45, nullable: true })
  color?: string;

  // readonly size: number;
}
