import { contextBridge, ipcRenderer } from 'electron';
import { AppApi, AppApiHandler, appApiName, GetDummiesParams } from 'shared/infra';

const appApiHandlers: AppApi = {
  getProgramInfo: () => ipcRenderer.invoke(AppApiHandler.GetProgramInfo),
  getUIConfig: () => ipcRenderer.invoke(AppApiHandler.GetUIConfig),
  getDummies: (params: GetDummiesParams) => ipcRenderer.invoke(AppApiHandler.GetDummies, params),
};

contextBridge.exposeInMainWorld(appApiName, appApiHandlers);
