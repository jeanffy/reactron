import { Configuration } from 'app-builder-lib';

const appId = 'reactron';
const binaryName = 'reactron';
const productName = 'Reactron';
const platformName = '${os}'; // https://www.electron.build/file-patterns#file-macros

const config: Configuration = {
  appId,
  // https://www.electron.build/file-patterns#file-macros
  artifactName: `${productName}-\${version}-${platformName}.\${ext}`,
  asar: true,
  copyright: `© ${new Date().getFullYear()}`,
  // extraFiles,
  files: ['output'],
  linux: {
    icon: 'etc/resources/icon.png',
    target: ['tar.gz'],
  },
  mac: {
    icon: 'etc/resources/icon.png',
    target: ['dmg'],
  },
  productName: binaryName,
  win: {
    icon: 'etc/resources/icon.ico',
    target: [
      {
        target: 'zip',
        arch: ['ia32'],
      },
    ],
  },
};

export default config;
