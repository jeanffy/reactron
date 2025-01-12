import { AppApi, DummyDto, GetDummiesParams, ProgramInfoDto, UIConfigDto } from 'shared/infra';

const fakeApi: AppApi = {
  getProgramInfo: (): Promise<ProgramInfoDto> => {
    return Promise.resolve({
      nodeVersion: 'Fake Node 0.0.0',
      electronVersion: 'Fake Electron 0.0.0',
      chromeVersion: 'Fake Chrome 0.0.0',
    });
  },

  getUIConfig: (): Promise<UIConfigDto> => {
    return Promise.resolve({
      locale: 'fr',
      logLevel: 4,
    });
  },

  getDummies: (params: GetDummiesParams): Promise<DummyDto[]> => {
    const dummies: DummyDto[] = [];
    for (let i = 0; i < params.howMany; i++) {
      dummies.push({
        name: `Dummy ${i}`,
      });
    }
    return Promise.resolve(dummies);
  },
};

export default fakeApi;
