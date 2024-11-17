import dotenv from 'dotenv';
import { app } from 'electron';

import { ElectronApp } from './infra/electron-app.js';
import getAppIoc from './infra/ioc.js';

dotenv.config();

async function main(): Promise<void> {
  const ioc = getAppIoc();
  const electronApp = ioc.getContainer().build(ElectronApp);
  await electronApp.init(app, ioc);
}

void main();
