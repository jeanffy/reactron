import { defineConfig } from 'vite';

import packageJson from './package.json';

export default defineConfig({
  build: {
    minify: 'esbuild',
    outDir: 'dist',
    rollupOptions: {
      output: {
        entryFileNames: 'preload.bundle.js',
        format: 'cjs',
      },
    },
    sourcemap: true,
    ssr: 'src/preload.ts',
  },
  ssr: {
    noExternal: Object.keys(packageJson.dependencies),
  },
});
