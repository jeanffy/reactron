import log from 'electron-log/renderer';
import { AppApi, appApiName, ConsoleAndFileLogger } from 'shared/infra';

import fakeApi from '../utils/fake-api/fake-api';

export default class AppContext {
  public api: AppApi;
  public locale: string;
  public logger: ConsoleAndFileLogger;

  public static get api(): AppApi {
    return this.instance().api;
  }

  public static get locale(): string {
    return this.instance().locale;
  }

  public static get logger(): ConsoleAndFileLogger {
    return this.instance().logger;
  }

  private constructor() {
    this.api = fakeApi;
    this.locale = 'fr';
    this.logger = new ConsoleAndFileLogger({
      logLevel: 0,
      log,
      process: 'renderer',
    });
  }

  public async initialize(): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const api = (window as any)[appApiName] as AppApi;
    // api is not mounted into window when not running inside Electron
    // in that case, we mount a fake api (see constructor) so that the renderer is still able to function
    if (api !== undefined) {
      this.api = api;
    }

    const uiConfig = await this.api.getUIConfig();

    this.locale = uiConfig.locale;

    this.logger = new ConsoleAndFileLogger({
      logLevel: uiConfig.logLevel,
      log,
      process: 'renderer',
    });
  }

  public static instance(): AppContext {
    if (appContextInstance === undefined) {
      appContextInstance = new AppContext();
    }
    return appContextInstance;
  }
}

let appContextInstance: AppContext | undefined;
