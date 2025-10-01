export type LogLevel = "debug" | "info" | "warn" | "error";

export interface LogMessage {
  level: LogLevel;
  message: string;
  timestamp: Date;
  meta?: Record<string, any>;
}

export interface Transport {
  log(entry: LogMessage): void;
}

export interface LoggerOptions {
  level?: LogLevel;
  transports?: Transport[];
  timeFormat?: (date: Date) => string; 
}
