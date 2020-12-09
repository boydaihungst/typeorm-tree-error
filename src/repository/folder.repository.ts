import { Service } from 'typedi';
import { EntityRepository } from 'typeorm';
import { Folder } from '../entity';
import { TreeRepoBase } from './base.repository';
@Service()
@EntityRepository(Folder)
export class FolderRepository extends TreeRepoBase<Folder> {}
