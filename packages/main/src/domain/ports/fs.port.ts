export const FS_PORT_TOKEN = Symbol.for('FsPort');

export enum FsPortDirEntryType {
  File,
  Directory,
}

export interface FsPortDirEntry {
  type: FsPortDirEntryType;
  fullPath: string;
  parentDirPath: string;
  name: string;
  extension: string;
}

export interface FsPort {
  createDirectory(directoryPath: string): Promise<void>;
  fileExists(filePath: string): Promise<boolean>;
  readDirectory(directoryPath: string): Promise<FsPortDirEntry[]>;
  readFile(filePath: string): Promise<string>;
  writeFile(filePath: string, data: string): Promise<void>;
}
