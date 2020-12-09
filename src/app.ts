import express, { Express } from 'express';
import https from 'https';
// Custome Middleware
import DbContext from './dbContext';
// Middleware
import Container, { Inject, Service } from 'typedi';
import FolderService from './folder.service';
@Service()
class App {
  public app: Express;
  constructor(@Inject('port') public port: number) {}

  public async initialize() {
    await this.initializeDatabase();
    this.app = express();
    //BUG: Error
    const result = await Container.get(FolderService).createRootFolder();
  }

  private async initializeDatabase(): Promise<void> {
    await new DbContext().connectMysql();
  }

  public start(): void {
    const server = https.createServer(this.app).listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
      server.once('close', () => console.info('Server closed'));
    });
  }
}

export default App;
