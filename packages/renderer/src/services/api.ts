import { AppApi, appApiName } from 'ipc';
import fakeApi from './fake-api';

let api: AppApi | undefined;

export function getApi(): AppApi {
  if (api === undefined) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    api = (window as any)[appApiName] as AppApi;
    if (api === undefined) {
      // api is not mounted into window when not running inside Electron
      // in that case, we mount a fake api so that the renderer is still able to function
      api = fakeApi;
    }
  }
  return api;
}
