import path from 'node:path';

import { BrowserWindow } from 'electron';

import { LOG_PORT_TOKEN, LogPort } from '../domain/ports/log.port.js';
import { InjectedDependencies } from '../types.js';
import { initializeApiController } from './api-controller.js';
import { AppIoc } from './ioc.js';
import { APP_PREFERENCES_PORT_TOKEN, AppPreferencesPort } from './ports/app-preferences.port.js';
import { INFRA_CONFIG_PORT_TOKEN, InfraConfigPort } from './ports/infra-config.port.js';

export class ElectronApp {
  private logPort: LogPort;
  private configPort: InfraConfigPort;
  private appPreferencesPort: AppPreferencesPort;

  private ioc?: AppIoc;
  private win?: BrowserWindow;

  public constructor(dependencies: InjectedDependencies) {
    this.logPort = dependencies[LOG_PORT_TOKEN];
    this.configPort = dependencies[INFRA_CONFIG_PORT_TOKEN];
    this.appPreferencesPort = dependencies[APP_PREFERENCES_PORT_TOKEN];
  }

  public async init(app: Electron.App, ioc: AppIoc): Promise<void> {
    this.ioc = ioc;

    await this.ioc.initialize();

    const preloadPath = path.join(app.getAppPath(), 'packages', 'preload', 'dist', 'preload.bundle.js');
    const rendererPath = path.join(app.getAppPath(), 'packages', 'renderer', 'dist', 'index.html');

    await app.whenReady();
    initializeApiController(app, this.ioc);
    await this.createWindow(preloadPath, rendererPath);

    app.on('activate', (): void => {
      if (BrowserWindow.getAllWindows().length === 0) {
        void this.createWindow(preloadPath, rendererPath);
      }
    });

    app.on('window-all-closed', (): void => {
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });

    let quitInProgress = false;
    app.on('before-quit', event => {
      if (!quitInProgress) {
        event.preventDefault();
        quitInProgress = true;
        setTimeout(() => {
          if (this.ioc !== undefined) {
            this.ioc
              .dispose()
              .catch(error => {
                console.error('error', error);
              })
              .finally(() => {
                app.quit();
              });
          }
        });
      }
    });
  }

  private async createWindow(preloadPath: string, rendererPath: string): Promise<void> {
    this.logPort.info({
      module: ElectronApp.name,
      msg: 'createWindow environment',
      payload: {
        processCwd: process.cwd(),
        preloadPath,
        rendererPath,
      },
    });

    this.win = new BrowserWindow({
      x: this.appPreferencesPort.windowX,
      y: this.appPreferencesPort.windowY,
      width: this.appPreferencesPort.windowWidth,
      height: this.appPreferencesPort.windowHeight,

      show: false,
      webPreferences: {
        preload: preloadPath,
      },
    });

    this.win.on('moved', () => {
      const bounds = this.win?.getBounds();
      if (bounds !== undefined) {
        this.appPreferencesPort.windowX = bounds.x;
        this.appPreferencesPort.windowY = bounds.y;
      }
    });

    this.win.on('resized', () => {
      const bounds = this.win?.getBounds();
      if (bounds !== undefined) {
        this.appPreferencesPort.windowWidth = bounds.width;
        this.appPreferencesPort.windowHeight = bounds.height;
        this.appPreferencesPort.windowMaximized = false;
      }
    });

    this.win.on('maximize', () => {
      this.appPreferencesPort.windowMaximized = true;
    });

    this.win.on('minimize', () => {
      this.appPreferencesPort.windowMaximized = false;
    });

    // this.win.webContents.on('devtools-opened', () => {
    //   this.appPreferencesPort.devToolsOpened = true;
    // });

    // this.win.webContents.on('devtools-closed', () => {
    //   this.appPreferencesPort.devToolsOpened = false;
    // });

    if (process.env.DEBUG_RENDERER_URL !== undefined) {
      await this.win.loadURL(process.env.DEBUG_RENDERER_URL);
    } else {
      await this.win.loadFile(rendererPath);
    }

    if (this.configPort.fullScreen) {
      this.win.setFullScreen(true);
    } else if (this.appPreferencesPort.windowMaximized) {
      this.win.maximize();
    }

    // if (this.appPreferencesPort.devToolsOpened) {
    //   this.win.webContents.openDevTools({ mode: 'bottom' });
    // }

    this.win.show();
  }
}
