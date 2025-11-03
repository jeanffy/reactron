import { defineConfig } from 'vite';

import packageJson from './package.json';

export default defineConfig({
  build: {
    minify: 'esbuild',
    outDir: process.env['BUILD_OUT_DIR'], // see moon.yml
    rollupOptions: {
      output: {
        entryFileNames: 'preload.js',
        format: 'cjs',
      },
    },
    sourcemap: true,
    ssr: './src/preload.ts',
  },
  ssr: {
    noExternal: Object.keys(packageJson.dependencies),
  },
});
