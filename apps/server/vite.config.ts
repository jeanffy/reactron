import { defineConfig } from 'vite';

import packageJson from './package.json';

export default defineConfig({
  build: {
    ssr: './src/main.ts',
    outDir: './dist',
  },
  ssr: {
    noExternal: Object.keys(packageJson.dependencies),
  },
});
