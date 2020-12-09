import { Service } from 'typedi';
import {
  DeepPartial,
  FindConditions,
  FindOneOptions,
  Repository,
  TreeRepository,
} from 'typeorm';

@Service()
export abstract class RepoBase<T> extends Repository<T> {
  public async findOneOrCreate(
    conditions?: FindConditions<T>,
    options?: FindOneOptions<T>,
  ) {
    const obj = await this.findOne(conditions, options);
    if (obj) return obj;
    return this.save(this.create(conditions as T));
  }

  public async findOneAndUpdate(
    conditions: FindConditions<T>,
    data: DeepPartial<T>,
    options?: FindOneOptions<T> & { upsert?: boolean },
  ) {
    let obj = await this.findOne(conditions, options);
    if (obj) {
      obj = this.merge(obj, data);
      return this.save(obj);
    } else if (options.upsert) {
      obj = this.create(data);
      return this.save(obj);
    }
    return null;
  }
}

@Service()
export abstract class TreeRepoBase<T> extends TreeRepository<T> {
  public async findOneOrCreate(
    conditions?: FindConditions<T>,
    options?: FindOneOptions<T>,
  ) {
    const obj = await this.findOne(conditions, options);
    if (obj) return obj;
    return this.save(this.create(conditions as T));
  }

  public async findOneAndUpdate(
    conditions: FindConditions<T>,
    data: DeepPartial<T>,
    options?: FindOneOptions<T> & { upsert?: boolean },
  ) {
    let obj = await this.findOne(conditions, options);
    if (obj) {
      obj = this.merge(obj, data);
      return this.save(obj);
    } else if (options.upsert) {
      obj = this.create(data);
      return this.save(obj);
    }
    return null;
  }
}
