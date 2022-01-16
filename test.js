import { Logger, get } from './index.js';

const logger = new Logger(Logger);
const l = get(Logger);

l.info('Hello World');
l.error('Hello World');
l.debug('Hello World');
l.warn('Hello World');
l.log('Hello World');