import promiseRetry from 'promise-retry';
import { createConnection, useContainer } from 'typeorm';
import { Container } from 'typedi';
import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository,
  patchTypeORMTreeRepositoryWithBaseTreeRepository,
} from 'typeorm-transactional-cls-hooked';
export default class DbContext {
  public async connectMysql() {
    initializeTransactionalContext();
    patchTypeORMRepositoryWithBaseRepository();
    patchTypeORMTreeRepositoryWithBaseTreeRepository();
    useContainer(Container);
    await promiseRetry(() => createConnection(), {
      retries: 3,
    }).catch((error) => {
      console.error('error', error);
      process.exit();
    });
  }
}
