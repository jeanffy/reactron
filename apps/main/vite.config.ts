import { defineConfig } from 'vite';

import packageJson from './package.json';

export default defineConfig({
  build: {
    minify: 'esbuild',
    outDir: 'dist/bundle',
    sourcemap: true,
    ssr: './src/main.ts',
  },
  ssr: {
    noExternal: Object.keys(packageJson.dependencies),
  },
});
