import path from 'node:path';

import electron from 'electron';

import { FS_PORT_TOKEN, FsPort } from '../../domain/ports/fs.port.js';
import { LOG_PORT_TOKEN, LogPort } from '../../domain/ports/log.port.js';
import { InjectedDependencies } from '../../types.js';
import { AppPreferencesPort } from '../ports/app-preferences.port.js';

export class JsonAppPreferencesAdapter implements AppPreferencesPort {
  private logPort: LogPort;
  private fsPort: FsPort;

  public windowX?: number;
  public windowY?: number;
  public windowWidth: number;
  public windowHeight: number;
  public windowMaximized: boolean;

  private preferencesFile: string;

  public constructor(dependencies: InjectedDependencies) {
    this.logPort = dependencies[LOG_PORT_TOKEN];
    this.fsPort = dependencies[FS_PORT_TOKEN];

    this.windowX = undefined;
    this.windowY = undefined;
    this.windowWidth = 950;
    this.windowHeight = 700;
    this.windowMaximized = false;

    this.preferencesFile = path.join(electron.app.getPath('userData'), 'App', 'AppPreferences.json');
    this.logPort.debug({
      module: JsonAppPreferencesAdapter.name,
      msg: `preferencesFile is '${this.preferencesFile}`,
    });
  }

  public async initialize(): Promise<void> {
    await this.fsPort.createDirectory(path.dirname(this.preferencesFile));

    if (await this.fsPort.fileExists(this.preferencesFile)) {
      const preferencesContent = await this.fsPort.readFile(this.preferencesFile);
      const preferences = JSON.parse(preferencesContent) as AppPreferencesPort;
      this.windowX = preferences.windowX;
      this.windowY = preferences.windowY;
      this.windowWidth = preferences.windowWidth;
      this.windowHeight = preferences.windowHeight;
      this.windowMaximized = preferences.windowMaximized;

      this.logPort.debug({
        module: JsonAppPreferencesAdapter.name,
        msg: `preferences read from '${this.preferencesFile}`,
        payload: preferences,
      });
    }
  }

  public async terminate(): Promise<void> {
    const preferences: AppPreferencesPort = {
      windowX: this.windowX,
      windowY: this.windowY,
      windowWidth: this.windowWidth,
      windowHeight: this.windowHeight,
      windowMaximized: this.windowMaximized,
    };
    await this.fsPort.writeFile(this.preferencesFile, JSON.stringify(preferences, undefined, 2));
    this.logPort.debug({
      module: JsonAppPreferencesAdapter.name,
      msg: `preferences written to '${this.preferencesFile}`,
      payload: preferences,
    });
  }
}
