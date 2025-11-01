import chalk from 'chalk';
import colors from 'colors';
import { getString } from 'lib-shared';
import lodash from 'lodash';

console.warn(getString());
console.warn(lodash.add(1, 2));
console.warn(chalk.bgBlack('hello'));
console.warn(colors.bgBlue('hello'));
