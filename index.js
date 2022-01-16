import { format } from 'fecha';
import { blueBright, red, cyan, yellow } from 'colorette';

export class Logger {
  // experimental method to automatically infer the name of a function
  static infer() {
    let name = (Error()).stack.split('\n')[2].trim().split(' ');
    
    if (name.length !== 3) name = 'main';
    else name = name[1];

    return new Logger(name);
  }

  constructor (clas) {
    if (typeof clas !== 'function') if (typeof clas !== 'string') throw new Error('not string/function');

    this.name = clas.name ?? clas;
  }

  info(...args) {
    console.log(global.LoggerFormat.formatMessage(0, this.name, args.join(' ')));
  }

  error(...args) {
    console.log(global.LoggerFormat.formatMessage(1, this.name, args.join(' ')));
  }

  debug(...args) {
    if (process.env.NODE_ENV === 'PRODUCTION') return;
    console.log(global.LoggerFormat.formatMessage(2, this.name, args.join(' ')));
  }

  warn(...args) {
    console.log(global.LoggerFormat.formatMessage(3, this.name, args.join(' ')));
  }

  log(...args) {
    console.log(global.LoggerFormat.formatMessage(4, this.name, args.join(' ')));
  }
}

export class Format {
  formatMessage(level, name, message) {
    const time = format(new Date(), 'YYYY-MM-DD hh:mm:ss,SSS A');
    return `${time} ${this.formatLevel(level)} [${blueBright(name)}] ${message}`;
  }

  formatLevel(level) {
    return [
      cyan('INFO '),
      red('ERROR'),
      yellow('DEBUG'),
      yellow('WARN '),
      'LOG  '
    ][level];
  }
}

export function get(clas) {
  return new Logger(clas);
}

if (!globalThis.LoggerFormat) globalThis.LoggerFormat = new Format();