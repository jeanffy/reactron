import { MainLogger, RendererLogger } from 'electron-log';

export interface ConsoleAndFileLoggerOptions {
  process: string;
  log: MainLogger | RendererLogger;
  logLevel: ConsoleAndFileLoggerLevel;
}

export interface ConsoleAndFileLoggerParams {
  module: string;
  msg: string;
  payload?: unknown;
}

// enum values are important here (must correspond to values in logLevelTitles array)
export enum ConsoleAndFileLoggerLevel {
  Exception = 0,
  Error = 1,
  Warning = 2,
  Info = 3,
  Debug = 4,
}

// order of strings is important here (must correspond to enum ConsoleAndFileLoggerLevel values)
const logLevelTitles = ['exception', 'error', 'warning', 'info', 'debug'];

export class ConsoleAndFileLogger {
  public constructor(protected options: ConsoleAndFileLoggerOptions) {}

  public debug(params: ConsoleAndFileLoggerParams): void {
    if (this.options.logLevel >= ConsoleAndFileLoggerLevel.Debug) {
      this.log(this.options.log.debug, ConsoleAndFileLoggerLevel.Debug, params);
    }
  }

  public info(params: ConsoleAndFileLoggerParams): void {
    if (this.options.logLevel >= ConsoleAndFileLoggerLevel.Info) {
      this.log(this.options.log.info, ConsoleAndFileLoggerLevel.Info, params);
    }
  }

  public warning(params: ConsoleAndFileLoggerParams): void {
    if (this.options.logLevel >= ConsoleAndFileLoggerLevel.Warning) {
      this.log(this.options.log.warn, ConsoleAndFileLoggerLevel.Warning, params);
    }
  }

  public error(params: ConsoleAndFileLoggerParams): void {
    if (this.options.logLevel >= ConsoleAndFileLoggerLevel.Error) {
      this.log(this.options.log.error, ConsoleAndFileLoggerLevel.Error, params);
    }
  }

  public exception(_error: unknown, params: ConsoleAndFileLoggerParams): void {
    if (this.options.logLevel >= ConsoleAndFileLoggerLevel.Exception) {
      this.log(this.options.log.error, ConsoleAndFileLoggerLevel.Exception, params);
    }
  }

  private log(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fn: (...params: any[]) => void,
    level: ConsoleAndFileLoggerLevel,
    params: ConsoleAndFileLoggerParams,
  ): void {
    fn({
      timestamp: new Date().toISOString(),
      process: this.options.process,
      module: params.module,
      severity: logLevelTitles[level],
      message: params.msg,
      payload: params.payload ?? undefined,
    });
  }
}
