import { asClass, AwilixContainer, createContainer } from 'awilix';

import { FS_PROVIDER_TOKEN } from '../domain/ports/fs.provider.js';
import { LOG_PROVIDER_TOKEN } from '../domain/ports/log.provider.js';
import { ConsoleAndFileLogProvider } from './providers/console-and-file-log.provider.js';
import { RealFsProvider } from './providers/real-fs.provider.js';

export class AppIoc {
  private iocContainer = createContainer();

  public constructor() {
    this.iocContainer.register({
      [FS_PROVIDER_TOKEN]: asClass(RealFsProvider).singleton(),
      [LOG_PROVIDER_TOKEN]: asClass(ConsoleAndFileLogProvider).singleton(),
    });
  }

  public getContainer(): AwilixContainer {
    return this.iocContainer;
  }

  public getItem<T>(token: symbol): T {
    return this.iocContainer.resolve<T>(token);
  }

  public async dispose(): Promise<void> {
    await this.iocContainer.dispose();
  }
}

let appIocInstance: AppIoc | undefined;

export default function getAppIoc(): AppIoc {
  if (appIocInstance === undefined) {
    appIocInstance = new AppIoc();
  }
  return appIocInstance;
}
