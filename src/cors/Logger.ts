import { LoggerOptions, LogMessage, LogLevel, Transport } from "./Types";
import { formatMessage } from "./Formatter";
import { ConsoleTransport } from "../transports/ConsoleTransport";

export class Logger {
  private level: LogLevel;
  private transports: Transport[];
  private timeFormat?: (d: Date) => string;

  constructor(options: LoggerOptions = {}) {
    this.level = options.level || "info";
    this.transports = options.transports || [new ConsoleTransport()];
    this.timeFormat = options.timeFormat;
  }

  private shouldLog(level: LogLevel): boolean {
    const order: LogLevel[] = ["debug", "info", "warn", "error"];
    return order.indexOf(level) >= order.indexOf(this.level);
  }

  private createMessage(level: LogLevel, message: string, meta?: Record<string, any>): LogMessage {
    return { level, message, timestamp: new Date(), meta };
  }

  private dispatch(entry: LogMessage) {
    for (const transport of this.transports) {
      transport.log(entry);
    }
  }

  debug(msg: string, meta?: Record<string, any>) {
    if (this.shouldLog("debug")) this.dispatch(this.createMessage("debug", msg, meta));
  }

  info(msg: string, meta?: Record<string, any>) {
    if (this.shouldLog("info")) this.dispatch(this.createMessage("info", msg, meta));
  }

  warn(msg: string, meta?: Record<string, any>) {
    if (this.shouldLog("warn")) this.dispatch(this.createMessage("warn", msg, meta));
  }

  error(msg: string, meta?: Record<string, any>) {
    if (this.shouldLog("error")) this.dispatch(this.createMessage("error", msg, meta));
  }

  format(entry: LogMessage): string {
    return formatMessage(entry, this.timeFormat);
  }
}
