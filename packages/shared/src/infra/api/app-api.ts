import { AppDummiesApi } from './dummies-api.js';
import { AppSystemApi } from './system-api.js';

export const appApiName = 'reactronApi';

export enum AppApiHandler {
  GetProgramInfo = 'GetProgramInfo',
  GetUIConfig = 'GetUIConfig',

  GetDummies = 'GetDummies',
}

export type AppApi = AppSystemApi & AppDummiesApi;
