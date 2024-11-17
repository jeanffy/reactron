import { ProgramInfoDto } from './dto/common.dto.js';

export const appApiName = 'reactronApi';

export enum AppApiHandler {
  GetProgramInfo = 'GetProgramInfo',
}

export interface AppApi {
  getProgramInfo: () => Promise<ProgramInfoDto>;
}
