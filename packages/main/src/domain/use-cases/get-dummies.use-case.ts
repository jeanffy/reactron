import { DummyEntity } from 'shared/domain';

import { InjectedDependencies } from '../../types.js';
import { DOMAIN_CONFIG_PORT_TOKEN, DomainConfigPort } from '../ports/domain-config.port.js';
import { FS_PORT_TOKEN, FsPort } from '../ports/fs.port.js';
import { LOG_PORT_TOKEN, LogPort } from '../ports/log.port.js';

export interface GetDummyUseCaseParams {
  howMany: number;
}

export class GetDummiesUseCase {
  public logPort: LogPort;
  public configPort: DomainConfigPort;
  public fsPort: FsPort;

  public constructor(dependencies: InjectedDependencies) {
    this.logPort = dependencies[LOG_PORT_TOKEN];
    this.configPort = dependencies[DOMAIN_CONFIG_PORT_TOKEN];
    this.fsPort = dependencies[FS_PORT_TOKEN];
  }

  public async run(params: GetDummyUseCaseParams): Promise<DummyEntity[]> {
    this.logPort.debug({
      module: GetDummiesUseCase.name,
      msg: `Getting ${params.howMany} dummy entities`,
    });
    const files = await this.fsPort.readDirectory(this.configPort.dummiesFolder);
    return files.slice(0, params.howMany).map(f => ({
      name: f.fullPath,
    }));
  }
}
