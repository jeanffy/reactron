import childProcess from 'node:child_process';
import path from 'node:path';

const rootDir = path.resolve(import.meta.dirname, '..', '..');

childProcess.execSync('npx commitlint --to HEAD', {
  cwd: rootDir,
  stdio: 'inherit',
});
