import fs from 'node:fs/promises';
import path from 'node:path';

import { FsPort, FsPortDirEntry, FsPortDirEntryType } from '../../domain/ports/fs.port.js';

export class RealFsAdapter implements FsPort {
  public async createDirectory(directoryPath: string): Promise<void> {
    await fs.mkdir(directoryPath, { recursive: true });
  }

  public async fileExists(filePath: string): Promise<boolean> {
    let fileExists = false;
    try {
      await fs.stat(filePath);
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

  public async readDirectory(directoryPath: string): Promise<FsPortDirEntry[]> {
    const entries = await fs.readdir(directoryPath, { withFileTypes: true });
    return entries
      .filter(e => e.isFile() || e.isDirectory())
      .map(e => ({
        type: e.isFile() ? FsPortDirEntryType.File : FsPortDirEntryType.Directory,
        fullPath: path.join(e.parentPath, e.name),
        parentDirPath: e.parentPath,
        name: e.name,
        extension: path.parse(e.name).ext,
      }));
  }

  public readFile(filePath: string): Promise<string> {
    return fs.readFile(filePath, { encoding: 'utf-8' });
  }

  public writeFile(filePath: string, data: string): Promise<void> {
    return fs.writeFile(filePath, data, { encoding: 'utf-8' });
  }
}
