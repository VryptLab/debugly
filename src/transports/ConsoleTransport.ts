import { Transport, LogMessage } from "../core/Types";
import { formatMessage } from "../core/Formatter";

export class ConsoleTransport implements Transport {
  log(entry: LogMessage): void {
    console.log(formatMessage(entry));
  }
}
