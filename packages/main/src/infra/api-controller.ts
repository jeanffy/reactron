import { ipcMain } from 'electron';
import { AppApiHandler, ProgramInfoDto } from 'ipc';

import { AppIoc } from './ioc.js';

export function initializeApiController(_ioc: AppIoc): void {
  ipcMain.handle(
    AppApiHandler.GetProgramInfo,
    async (_event): Promise<ProgramInfoDto> => {
      return Promise.resolve({
        nodeVersion: process.versions.node,
        chromeVersion: process.versions.chrome ?? 'undefined',
        electronVersion: process.versions.electron ?? 'undefined',
      });
    },
  );
}
