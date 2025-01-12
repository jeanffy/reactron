import { ConsoleAndFileLoggerLevel } from 'shared/infra';

import { DomainConfigPort } from '../../domain/ports/domain-config.port.js';
import { InfraConfigPort } from '../ports/infra-config.port.js';

export class EnvConfigAdapter implements DomainConfigPort, InfraConfigPort {
  // infra
  public readonly forceLocale?: string;
  public readonly logLevel: ConsoleAndFileLoggerLevel;
  public readonly fullScreen: boolean;
  // domain
  public readonly dummiesFolder: string;

  public constructor() {
    this.forceLocale = process.env.FORCE_LOCALE;

    this.logLevel = ConsoleAndFileLoggerLevel.Debug;
    switch (process.env.LOG_LEVEL) {
      case `${ConsoleAndFileLoggerLevel.Info}`:
        this.logLevel = ConsoleAndFileLoggerLevel.Info;
        break;
      case `${ConsoleAndFileLoggerLevel.Warning}`:
        this.logLevel = ConsoleAndFileLoggerLevel.Warning;
        break;
      case `${ConsoleAndFileLoggerLevel.Error}`:
        this.logLevel = ConsoleAndFileLoggerLevel.Error;
        break;
      case `${ConsoleAndFileLoggerLevel.Exception}`:
        this.logLevel = ConsoleAndFileLoggerLevel.Exception;
        break;
    }

    this.fullScreen = process.env.FULLSCREEN === '1';

    this.dummiesFolder = process.env.DUMMIES_FOLDER ?? '/tmp';
  }
}
