import { defineConfig, mergeConfig } from 'vitest/config';

import rootConfig from '../../vitest.config.js';

export default mergeConfig(
  rootConfig,
  defineConfig({
    test: {
      coverage: {
        exclude: ['src/index.ts'],
      },
    },
  }),
);
