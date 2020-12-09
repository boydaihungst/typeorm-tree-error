import { FolderRepository } from '../src/repository';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { UserRepository } from './repository/user.repository';

@Service()
export default class FolderService {
  public constructor(
    @InjectRepository()
    readonly folderRepository: FolderRepository,
    @InjectRepository()
    readonly userRepository: UserRepository,
  ) {}

  @Transactional()
  public async createRootFolder() {
    const user = await this.userRepository.save(
      this.userRepository.create({
        account: 'example',
        email: 'example@gmail.com',
        phoneNumber: '0972845643',
        password: 'example1234',
      }),
    );
    const result = await this.folderRepository.save(
      this.folderRepository.create({
        name: `ROOT/test`,
        statistic: {
          downloaded: 0,
          viewed: 0,
        },
        owner: user,
        lastModifier: user,
        isRoot: true,
      }),
    );
    console.log(result);
    return result;
  }
}
