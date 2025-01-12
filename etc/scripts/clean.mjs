import fs from 'node:fs';
import path from 'node:path';

const rootDir = path.resolve(import.meta.dirname, '..', '..');

function rmdir(dirPath) {
  console.log(`rmdir ${dirPath}`);
  fs.rmSync(dirPath, { force: true, recursive: true });
}

rmdir(path.join(rootDir, '.nx'));

function clean(name) {
  rmdir(path.join(rootDir, name, 'dist'));
  rmdir(path.join(rootDir, name, 'node_modules'));
  rmdir(path.join(rootDir, name, 'output'));
}

clean(path.join('packages', 'main'));
clean(path.join('packages', 'preload'));
clean(path.join('packages', 'renderer'));
clean(path.join('packages', 'shared'));
clean('.');
