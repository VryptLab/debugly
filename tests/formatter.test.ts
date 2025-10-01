import { formatMessage } from "../src/core/Formatter";
import { LogMessage } from "../src/core/Types";

describe("Formatter", () => {
  const baseLog: LogMessage = {
    level: "info",
    message: "Hello",
    timestamp: new Date("2025-10-01T10:00:00Z"),
    meta: { user: "alice" },
  };

  it("should format message with default ISO timestamp", () => {
    const output = formatMessage(baseLog);
    expect(output).toContain("2025-10-01T10:00:00.000Z");
    expect(output).toContain("INFO");
    expect(output).toContain("Hello");
    expect(output).toContain("alice");
  });

  it("should apply custom timeFormat", () => {
    const output = formatMessage(baseLog, () => "CUSTOM TIME");
    expect(output).toContain("CUSTOM TIME");
  });
});
