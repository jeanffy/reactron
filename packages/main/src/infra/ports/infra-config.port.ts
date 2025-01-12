import { ConsoleAndFileLoggerLevel } from 'shared/infra';

export const INFRA_CONFIG_PORT_TOKEN = Symbol.for('InfraConfigPort');

export interface InfraConfigPort {
  readonly forceLocale?: string;
  readonly logLevel: ConsoleAndFileLoggerLevel;
  readonly fullScreen: boolean;
}
