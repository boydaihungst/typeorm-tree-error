import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CustomBaseEntity } from './Base';
import { UploadSession } from './UploadSession';

@Entity()
export class UploadFilePartial extends CustomBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'tinyint', nullable: false, unsigned: true })
  partIndex: number;

  @Column({
    type: 'int',
    nullable: false,
    unsigned: true,
    default: 0,
  })
  partSize: number;

  @Column({ type: 'nvarchar', length: 2000, nullable: false })
  icqUrl: string;

  @Column({ type: 'text', nullable: true })
  icqFileResult?: string;

  @Column({ nullable: false })
  uploadSessionId: string;

  @ManyToOne(() => UploadSession, (x) => x.uploadPartials, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  uploadSession: UploadSession;
}
