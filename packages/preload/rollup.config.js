import { nodeResolve } from '@rollup/plugin-node-resolve';

const config = [
  {
    cache: false,
    external: ['electron'],
    input: 'dist/src/preload.js',
    output: {
      file: 'dist/preload.bundle.js',
      format: 'cjs',
      sourcemap: true,
    },
    plugins: [nodeResolve()],
  },
];

export default config;
