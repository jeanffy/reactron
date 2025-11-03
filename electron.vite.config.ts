import { defineConfig, externalizeDepsPlugin } from 'electron-vite';

export default defineConfig({
  main: {
    build: {
      outDir: 'output/debug/main',
      rollupOptions: {
        input: 'apps/main/src/main.ts',
        output: {
          entryFileNames: 'main.js',
          format: 'es',
        },
      },
      sourcemap: true,
    },
    environments: {},
    plugins: [externalizeDepsPlugin()],
  },
  preload: {
    build: {
      outDir: 'output/debug/preload',
      rollupOptions: {
        input: 'libs/ts/preload/src/preload.ts',
        output: {
          entryFileNames: 'preload.js',
          format: 'cjs',
        },
      },
      sourcemap: true,
    },
    plugins: [externalizeDepsPlugin()],
  },
  renderer: {
    root: 'apps/renderer',
    build: {
      outDir: 'output/debug/renderer',
      rollupOptions: {
        input: 'apps/renderer/index.html',
      },
      sourcemap: true,
    },
  },
});
