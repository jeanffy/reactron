import { ProgramInfoDto } from '../dto/program-info.dto.js';
import { UIConfigDto } from '../dto/ui-config.dto.js';

export interface AppSystemApi {
  getProgramInfo: () => Promise<ProgramInfoDto>;
  getUIConfig: () => Promise<UIConfigDto>;
}
