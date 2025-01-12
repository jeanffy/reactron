import { asClass, AwilixContainer, ClassOrFunctionReturning, createContainer, Resolver } from 'awilix';

import { DOMAIN_CONFIG_PORT_TOKEN } from '../domain/ports/domain-config.port.js';
import { FS_PORT_TOKEN } from '../domain/ports/fs.port.js';
import { LOG_PORT_TOKEN } from '../domain/ports/log.port.js';
import { ConsoleAndFileLogAdapter } from './adapters/console-and-file-log.adapter.js';
import { EnvConfigAdapter } from './adapters/env-config.adapter.js';
import { JsonAppPreferencesAdapter } from './adapters/json-preferences.adapter.js';
import { RealFsAdapter } from './adapters/real-fs.adapter.js';
import { APP_PREFERENCES_PORT_TOKEN } from './ports/app-preferences.port.js';
import { INFRA_CONFIG_PORT_TOKEN } from './ports/infra-config.port.js';

export class AppIoc {
  private iocContainer = createContainer();

  public constructor() {
    this.iocContainer.register({
      [FS_PORT_TOKEN]: asClass(RealFsAdapter).singleton(),
      [LOG_PORT_TOKEN]: asClass(ConsoleAndFileLogAdapter).singleton(),
      [DOMAIN_CONFIG_PORT_TOKEN]: asClass(EnvConfigAdapter).singleton(),
      [INFRA_CONFIG_PORT_TOKEN]: asClass(EnvConfigAdapter).singleton(),
      [APP_PREFERENCES_PORT_TOKEN]: asClass(JsonAppPreferencesAdapter)
        .singleton()
        .disposer(p => p.terminate()),
    });
  }

  public async initialize(): Promise<void> {
    const appPreferencesPort = this.getItemFromToken(APP_PREFERENCES_PORT_TOKEN) as JsonAppPreferencesAdapter;
    await appPreferencesPort.initialize();
  }

  public getContainer(): AwilixContainer {
    return this.iocContainer;
  }

  public getItemFromToken<T>(token: symbol): T {
    return this.iocContainer.resolve<T>(token);
  }

  public getItem<T>(targetOrResolver: ClassOrFunctionReturning<T> | Resolver<T>): T {
    return this.iocContainer.build(targetOrResolver);
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
