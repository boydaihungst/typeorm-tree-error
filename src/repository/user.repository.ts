import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entity/User';
import { Service } from 'typedi';
import { RepoBase } from './base.repository';
@Service()
@EntityRepository(User)
export class UserRepository extends RepoBase<User> {
  // public async save<T extends DeepPartial<User>>(
  //   entity: T,
  //   options?: SaveOptions & { validate?: boolean } & ValidatorOptions,
  // ): Promise<T & User> {
  //   await ValidateReject(plainToClass(User, entity), options);
  //   entity.password = await this.encryptPassword(entity.password);
  //   return await Repository.prototype.save.call(this, entity);
  // }
  // public async encryptPassword(password: string) {
  //   if (!password) return;
  //   const salt = await bcrypt.genSalt(10);
  //   const hash = await bcrypt.hash(password, salt);
  //   return hash;
  // }
}
