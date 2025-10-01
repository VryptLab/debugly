import chalk from "chalk";
import { LogMessage } from "./Types";

const levelColors: Record<string, chalk.Chalk> = {
  debug: chalk.gray,
  info: chalk.cyan,
  warn: chalk.yellow,
  error: chalk.red.bold,
};

export function formatMessage(entry: LogMessage, timeFormat?: (d: Date) => string): string {
  const ts = timeFormat ? timeFormat(entry.timestamp) : entry.timestamp.toISOString();
  const level = levelColors[entry.level](
    entry.level.toUpperCase().padEnd(5, " ")
  );
  const msg = entry.message;
  const meta = entry.meta ? chalk.dim(JSON.stringify(entry.meta)) : "";

  return `${chalk.green(ts)} [${level}] ${msg} ${meta}`;
}
