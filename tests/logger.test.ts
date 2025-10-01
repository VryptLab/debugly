import { Logger } from "../src/core/Logger";
import { Transport, LogMessage } from "../src/core/Types";

class MemoryTransport implements Transport {
  logs: LogMessage[] = [];
  log(entry: LogMessage) {
    this.logs.push(entry);
  }
}

describe("Logger", () => {
  it("should log messages with correct level", () => {
    const transport = new MemoryTransport();
    const logger = new Logger({ level: "debug", transports: [transport] });

    logger.debug("Debug msg");
    logger.info("Info msg");
    logger.warn("Warn msg");
    logger.error("Error msg");

    expect(transport.logs.length).toBe(4);
    expect(transport.logs.map(l => l.level)).toEqual(["debug", "info", "warn", "error"]);
  });

  it("should respect log level filtering", () => {
    const transport = new MemoryTransport();
    const logger = new Logger({ level: "warn", transports: [transport] });

    logger.debug("Debug msg");
    logger.info("Info msg");
    logger.warn("Warn msg");
    logger.error("Error msg");

    expect(transport.logs.length).toBe(2);
    expect(transport.logs.map(l => l.level)).toEqual(["warn", "error"]);
  });

  it("should support custom timeFormat", () => {
    const transport = new MemoryTransport();
    const logger = new Logger({
      level: "info",
      transports: [transport],
      timeFormat: (d) => "CUSTOM:" + d.getFullYear()
    });

    logger.info("Test time format");

    const entry = transport.logs[0];
    expect(entry).toBeDefined();
    expect(entry.message).toBe("Test time format");
    // timeFormat diterapkan di Formatter, jadi kita test lewat format()
    const formatted = logger.format(entry);
    expect(formatted).toContain("CUSTOM:");
  });
});
