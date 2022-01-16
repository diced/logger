export class Logger {
  public constructor(name: string | Function): Logger;
  public static infer(): Logger;

  public info(...args: any[]): void;
  public warn(...args: any[]): void;
  public error(...args: any[]): void;
  public debug(...args: any[]): void;
  public log(...args: any[]): void;
}

export class Format {
  public formatMessage(level: number, name: string, message: string): string;
  public formatLevel(level: number): string;
}

export function get(clas: string | Function): Logger;

declare global {
  namespace NodeJS {
    interface Global {
      LoggerFormat: Format;
    }
  }
}