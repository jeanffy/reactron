import { DummyDto } from '../dto/dummy.dto.js';

export interface GetDummiesParams {
  howMany: number;
}

export interface AppDummiesApi {
  getDummies: (params: GetDummiesParams) => Promise<DummyDto[]>;
}
