import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { SIGNUP_VERIFY_TYPE } from '../helpers/enum';
import { CustomBaseEntity } from './Base';
import { User } from './User';

@Entity()
export class SignupVerify extends CustomBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 10, nullable: false })
  code: string;

  @Column({ type: 'enum', nullable: false, enum: SIGNUP_VERIFY_TYPE })
  type: SIGNUP_VERIFY_TYPE;

  @Column({ type: 'datetime', nullable: false })
  expiredAt: Date;

  @Column({ nullable: false })
  userId: string;

  @ManyToOne(() => User, (x) => x.signupVerifieds, {
    nullable: false,
  })
  user: User;
}
