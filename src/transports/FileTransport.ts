import fs from "fs";
import { Transport, LogMessage } from "../core/Types";

export class FileTransport implements Transport {
  private stream: fs.WriteStream;

  constructor(filename: string) {
    this.stream = fs.createWriteStream(filename, { flags: "a" });
  }

  log(entry: LogMessage): void {
    const line = JSON.stringify({
      level: entry.level,
      message: entry.message,
      timestamp: entry.timestamp.toISOString(),
      meta: entry.meta || {},
    }) + "\n";

    this.stream.write(line);
  }
}
