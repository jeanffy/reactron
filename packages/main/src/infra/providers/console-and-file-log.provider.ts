import fs from 'node:fs';
import path from 'node:path';

import log from 'electron-log/main.js';

import { LogParams, LogProvider } from '../../domain/ports/log.provider.js';

log.initialize();
log.transports.file.maxSize = 1024;
log.transports.file.archiveLogFn = (oldLogFile): void => {
  const parsed = path.parse(oldLogFile.path);
  try {
    const now = new Date();
    const isoNow = now.toISOString().replaceAll(':', '-').replaceAll('.', '-');
    fs.renameSync(
      oldLogFile.path,
      path.join(parsed.dir, `${parsed.name}.${isoNow}${parsed.ext}`),
    );
  } catch (error) {
    console.warn('Could not rotate log file', error);
  }
};

interface LogProperties {
  timestamp: string;
  module: string | null;
  severity: string;
  message: string;
  payload: object | null;
}

enum LogSeverity {
  Exception = 'exception',
  Error = 'error',
  Warning = 'warning',
  Info = 'info',
  Debug = 'debug',
}

export class ConsoleAndFileLogProvider implements LogProvider {
  public debug(params: LogParams): void {
    if (process.env.DEBUG_LOG === '1') {
      this.log(log.debug, LogSeverity.Debug, params);
    }
  }

  public info(params: LogParams): void {
    this.log(log.info, LogSeverity.Info, params);
  }

  public warning(params: LogParams): void {
    this.log(log.warn, LogSeverity.Warning, params);
  }

  public error(params: LogParams): void {
    this.log(log.error, LogSeverity.Error, params);
  }

  public exception(_error: unknown, params: LogParams): void {
    this.log(log.error, LogSeverity.Exception, params);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private log(fn: (...params: any[]) => void, severity: LogSeverity, params: LogParams): void {
    const props: LogProperties = {
      timestamp: new Date().toISOString(),
      severity,
      module: params.module ?? null,
      message: params.msg,
      payload: params.payload ?? null,
    };
    fn(props);
  }
}
