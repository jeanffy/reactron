import { glob } from 'glob';
import uglifyJs from 'uglify-js';
import { BeforeBuildContext, Configuration, FileSet } from 'app-builder-lib';

const isProduction = process.env['PRODUCTION'] === '1';
console.log('isProduction', isProduction);

const config: Configuration = {
  appId: 'reactron',
  artifactName: '${productName}-${version}-${os}-${arch}.${ext}',
  asar: isProduction,
  beforeBuild: async (_context: BeforeBuildContext) => {
    if (isProduction) {
      console.log('uglifying js files');
      const jsFiles = await glob(['packages/{shared,main}/dist/src/**/*.js', 'packages/preload/dist/preload.bundle.js']);
      for (const jsFile of jsFiles) {
        const code = await fs.readFile(jsFile, { encoding: 'utf-8' });
        const uglified = uglifyJs.minify(code);
        if (uglified.error !== undefined) {
          console.error(uglified.error);
          return false;
        }
        if (uglified.warnings !== undefined) {
          console.warn(uglified.warnings);
        }
        await fs.writeFile(jsFile, uglified.code, { encoding: 'utf-8' });
      }
    }
    return true;
  },
  files: [
    '!**/*',
    'node_modules',
    'packages/main/dist/src',
    'packages/main/package.json',
    'packages/preload/dist/preload.bundle.js',
    'packages/renderer/dist',
    {
      from: 'packages/shared',
      to: 'node_modules/shared',
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
        arch: ['ia32', 'x64'],
      },
    ],
  },
};

export default config;
