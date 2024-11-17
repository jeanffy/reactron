export const LOG_PROVIDER_TOKEN = Symbol.for('LogProvider');

export interface LogParams {
  msg: string;
  payload?: unknown;
  module: string;
}

export interface LogProvider {
  debug(params: LogParams): void;
  info(params: LogParams): void;
  warning(params: LogParams): void;
  error(params: LogParams): void;
  exception(error: unknown, params: LogParams): void;
}
