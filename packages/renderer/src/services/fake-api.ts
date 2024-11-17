import { AppApi, ProgramInfoDto } from 'ipc';

const fakeApi: AppApi = {
  getProgramInfo: (): Promise<ProgramInfoDto> => {
    return Promise.resolve({
      nodeVersion: 'Fake Node 0.0.0',
      electronVersion: 'Fake Electron 0.0.0',
      chromeVersion: 'Fake Chrome 0.0.0',
    });
  }
};

export default fakeApi;
