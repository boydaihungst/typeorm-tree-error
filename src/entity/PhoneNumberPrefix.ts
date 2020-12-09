import { IsNotEmpty, MaxLength } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { CustomBaseEntity } from './Base';
import { User } from './User';
@Entity()
export class PhoneNumberPrefix extends CustomBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 10,
    nullable: false,
    unique: true,
  })
  @IsNotEmpty({ message: 'FIELD_IS_REQUIRED' })
  @MaxLength(10, { message: 'FIELD_LENGTH_MAX' })
  value: string;

}
