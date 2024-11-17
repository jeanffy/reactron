export const FS_PROVIDER_TOKEN = Symbol.for('FsProvider');

export interface FsStats {
  isFile: () => boolean;
  size: number;
}

export interface FsProvider {
  fileExists(filePath: string): Promise<boolean>;
  stat(filePath: string): Promise<FsStats>;
}
