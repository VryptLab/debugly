import fs from "fs";
import path from "path";
import { ConsoleTransport } from "../src/transports/ConsoleTransport";
import { FileTransport } from "../src/transports/FileTransport";
import { LogMessage } from "../src/core/Types";

describe("Transports", () => {
  const log: LogMessage = {
    level: "info",
    message: "Test",
    timestamp: new Date("2025-10-01T10:00:00Z"),
  };

  it("ConsoleTransport should print formatted message", () => {
    const spy = jest.spyOn(console, "log").mockImplementation(() => {});
    const transport = new ConsoleTransport();
    transport.log(log);

    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it("FileTransport should append logs to file", () => {
    const filename = path.join(__dirname, "test.log");
    if (fs.existsSync(filename)) fs.unlinkSync(filename);

    const transport = new FileTransport(filename);
    transport.log(log);

    const content = fs.readFileSync(filename, "utf8");
    expect(content).toContain('"message":"Test"');
    expect(content).toContain('"level":"info"');
  });
});
