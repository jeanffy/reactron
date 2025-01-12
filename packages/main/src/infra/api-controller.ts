import { ipcMain } from 'electron';
import { AppApiHandler, DummyDto, GetDummiesParams, ProgramInfoDto, UIConfigDto } from 'shared/infra';

import { LOG_PORT_TOKEN, LogPort } from '../domain/ports/log.port.js';
import { GetDummiesUseCase } from '../domain/use-cases/get-dummies.use-case.js';
import { AppIoc } from './ioc.js';
import { INFRA_CONFIG_PORT_TOKEN, InfraConfigPort } from './ports/infra-config.port.js';

export function initializeApiController(app: Electron.App, ioc: AppIoc): void {
  const logPort = ioc.getItemFromToken<LogPort>(LOG_PORT_TOKEN);

  ipcMain.handle(AppApiHandler.GetProgramInfo, async (_event): Promise<ProgramInfoDto> => {
    return Promise.resolve({
      nodeVersion: process.versions.node,
      chromeVersion: process.versions.chrome,
      electronVersion: process.versions.electron,
    });
  });

  ipcMain.handle(AppApiHandler.GetUIConfig, async (_event): Promise<UIConfigDto> => {
    const infraConfigPort = ioc.getItemFromToken<InfraConfigPort>(INFRA_CONFIG_PORT_TOKEN);
    const config: UIConfigDto = {
      locale: infraConfigPort.forceLocale ?? app.getLocaleCountryCode().toLowerCase(),
      logLevel: infraConfigPort.logLevel,
    };
    logPort.debug({
      module: initializeApiController.name,
      msg: AppApiHandler.GetUIConfig,
      payload: config,
    });
    return config;
  });

  ipcMain.handle(AppApiHandler.GetDummies, async (_event, params: GetDummiesParams): Promise<DummyDto[]> => {
    logPort.debug({ module: initializeApiController.name, msg: AppApiHandler.GetDummies });
    const useCase = ioc.getItem(GetDummiesUseCase);
    const dummies = await useCase.run({ howMany: params.howMany });
    logPort.debug({ module: initializeApiController.name, msg: AppApiHandler.GetDummies, payload: dummies });
    return dummies;
  });
}
