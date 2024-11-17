import fs from 'node:fs/promises';

import { FsProvider, FsStats } from '../../domain/ports/fs.provider.js';

export class RealFsProvider implements FsProvider {
  public async fileExists(filePath: string): Promise<boolean> {
    let fileExists = false;
    try {
      await this.stat(filePath);
      fileExists = true;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((error as any).code === 'ENOENT') {
        fileExists = false;
      } else {
        throw error;
      }
    }
    return fileExists;
  }

  public async stat(filePath: string): Promise<FsStats> {
    return fs.stat(filePath);
  }
}
