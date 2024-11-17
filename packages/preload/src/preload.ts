import { contextBridge, ipcRenderer } from 'electron';
import { AppApi, AppApiHandler, appApiName } from 'ipc';

const appApiHandlers: AppApi = {
  getProgramInfo: () => ipcRenderer.invoke(AppApiHandler.GetProgramInfo),
};

contextBridge.exposeInMainWorld(appApiName, appApiHandlers);
