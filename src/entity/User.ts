import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  Index,
  Unique,
} from 'typeorm';
import { CustomBaseEntity } from './Base';
import { Imgbb } from './Imgbb';
import { PhoneNumberPrefix } from './PhoneNumberPrefix';
import { SignupVerify } from './SignupVerify';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Matches,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { TemporaryUrl } from './TemporaryUrl';
import { REGEX } from '../helpers/enum';
import { FileFolderBase } from './FileFolderBase';

@Entity()
// @Index(['email', 'phoneNumber', 'account'])
@Index(['firstName', 'lastName'], { fulltext: true })
// @Unique(['account', 'email', 'phoneNumber'])
export class User extends CustomBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'nvarchar', length: 50, default: '', nullable: true })
  @IsOptional()
  @MaxLength(50, { message: 'FIELD_LENGTH_MAX' })
  firstName?: string;

  @Column({ type: 'nvarchar', length: 50, default: '', nullable: true })
  @IsOptional()
  @MaxLength(50, { message: 'FIELD_LENGTH_MAX' })
  lastName?: string;

  @Column({ nullable: false, type: 'nvarchar', length: 255 })
  @IsNotEmpty({ message: 'FIELD_IS_REQUIRED' })
  @MaxLength(255, { message: 'FIELD_LENGTH_MAX' })
  account: string;

  @Column({
    nullable: false,
    type: 'nvarchar',
    length: 255,
  })
  @IsEmail({}, { message: 'INCORRECT_EMAIL_FORMAT' })
  email: string;

  @Column({
    select: false,
    nullable: false,
    type: 'nvarchar',
    length: 255,
  })
  @IsNotEmpty({ message: 'FIELD_IS_REQUIRED' })
  @MaxLength(255, { message: 'FIELD_LENGTH_MAX' })
  password: string;

  @Column({
    type: 'boolean',
    default: false,
    nullable: false,
  })
  @IsOptional()
  @IsBoolean()
  emailVerified?: boolean;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 255,
  })
  @Matches(new RegExp(REGEX.phone), {
    message: 'INCORRECT_PHONE_FORMAT',
  })
  phoneNumber: string;

  @Column({
    type: 'boolean',
    default: false,
    nullable: false,
  })
  @IsOptional()
  @IsBoolean()
  phoneNumberVerified: boolean;

  @OneToMany(() => FileFolderBase, (x) => x.owner, {})
  ownedFiles?: FileFolderBase[];

  @OneToMany(() => FileFolderBase, (x) => x.lastModifier, {})
  modifiedFiles?: FileFolderBase[];

  @OneToMany(() => SignupVerify, (x) => x.user)
  signupVerifieds: SignupVerify[];

  @OneToMany(() => TemporaryUrl, (x) => x.owner)
  temporaryUrls: TemporaryUrl[];

  passwordConfirmation?: string;

  passwordOld?: string;

  get fullName() {
    return `${this.firstName || ''} ${this.lastName || ''}`.trim();
  }
}
