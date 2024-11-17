import { InjectedDependencies } from '../../types.js';
import { LOG_PROVIDER_TOKEN, LogProvider } from '../ports/log.provider.js';

export class GetMusicUseCase {
  public logProvider: LogProvider;

  public constructor(dependencies: InjectedDependencies) {
    this.logProvider = dependencies[LOG_PROVIDER_TOKEN];
  }

  public run(): Promise<void> {
    this.logProvider.info({
      module: 'aa',
      msg: 'GetMusicUseCase',
    });
    return Promise.resolve();
  }
}
