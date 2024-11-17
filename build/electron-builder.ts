import { Configuration } from 'app-builder-lib';

const config: Configuration = {
  appId: 'reactron',
  artifactName: '${productName}-${version}-${os}-${arch}.${ext}',
  asar: true,
  files: [
    '!**/*',
    'node_modules',
    'packages/main/dist/src',
    'packages/main/package.json',
    'packages/preload/dist/preload.bundle.js',
    'packages/renderer/dist',
    {
      from: 'packages/ipc',
      to: 'node_modules/ipc',
      filter: ['package.json', 'dist/src'],
    },
  ],
  linux: {
    target: ['zip'],
  },
  mac: {
    target: ['dmg'],
  },
  productName: 'Reactron',
  win: {
    target: [
      {
        target: 'zip',
        arch: ['ia32', 'x64']
      },
    ],
  },
};

export default config;
