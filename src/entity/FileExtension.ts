import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CustomBaseEntity } from './Base';
import { Imgbb } from './Imgbb';

@Entity()
export class FileExtension extends CustomBaseEntity {
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

  @OneToMany(() => Imgbb, (x) => x.extension, {})
  imgbbs?: Imgbb[];
}
