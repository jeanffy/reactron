import path from 'node:path';

import { BrowserWindow } from 'electron';

import {
  LOG_PROVIDER_TOKEN,
  LogProvider,
} from '../domain/ports/log.provider.js';
import { InjectedDependencies } from '../types.js';
import { initializeApiController } from './api-controller.js';
import { AppIoc } from './ioc.js';

export class ElectronApp {
  private logProvider: LogProvider;

  private ioc?: AppIoc;
  private win?: BrowserWindow;

  public constructor(dependencies: InjectedDependencies) {
    this.logProvider = dependencies[LOG_PROVIDER_TOKEN];
  }

  public async init(app: Electron.App, ioc: AppIoc): Promise<void> {
    this.ioc = ioc;

    const preloadPath = path.join(
      app.getAppPath(),
      'packages',
      'preload',
      'dist',
      'preload.bundle.js',
    );
    const rendererPath = path.join(
      app.getAppPath(),
      'packages',
      'renderer',
      'dist',
      'index.html',
    );

    await app.whenReady();
    initializeApiController(this.ioc);
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
    app.on('before-quit', (event) => {
      if (!quitInProgress) {
        event.preventDefault();
        quitInProgress = true;
        setTimeout(() => {
          if (this.ioc !== undefined) {
            this.ioc
              .dispose()
              .catch((error) => {
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
    this.logProvider.info({
      module: ElectronApp.name,
      msg: `preloadPath: ${preloadPath}`,
    });
    this.logProvider.info({
      module: ElectronApp.name,
      msg: `rendererPath: ${rendererPath}`,
    });

    this.win = new BrowserWindow({
      // x: this.appPreferencesProvider.windowX,
      // y: this.appPreferencesProvider.windowY,
      // width: this.appPreferencesProvider.windowWidth,
      // height: this.appPreferencesProvider.windowHeight,

      show: false,
      webPreferences: {
        preload: preloadPath,
      },
    });

    this.win.on('moved', () => {
      const bounds = this.win?.getBounds();
      if (bounds !== undefined) {
        // this.appPreferencesProvider.windowX = bounds.x;
        // this.appPreferencesProvider.windowY = bounds.y;
      }
    });

    this.win.on('resized', () => {
      const bounds = this.win?.getBounds();
      if (bounds !== undefined) {
        // this.appPreferencesProvider.windowWidth = bounds.width;
        // this.appPreferencesProvider.windowHeight = bounds.height;
      }
    });

    this.win.on('maximize', () => {
      //this.appPreferencesProvider.windowMaximized = true;
    });

    this.win.on('minimize', () => {
      //this.appPreferencesProvider.windowMaximized = false;
    });

    this.win.webContents.on('devtools-opened', () => {
      //this.appPreferencesProvider.devToolsOpened = true;
    });

    this.win.webContents.on('devtools-closed', () => {
      //this.appPreferencesProvider.devToolsOpened = false;
    });

    await this.win.loadFile(rendererPath);
    // if (this.appPreferencesProvider.windowMaximized) {
    //   this.win.maximize();
    // }
    // if (this.appPreferencesProvider.devToolsOpened) {
    //   this.win.webContents.openDevTools({ mode: 'bottom' });
    // }

    this.win.show();
  }
}
