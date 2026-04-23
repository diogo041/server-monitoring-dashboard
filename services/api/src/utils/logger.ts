import * as fs from "fs";
import * as path from "path";

type LogLevel = "info" | "warn" | "error";
type LogMeta = Record<string, unknown>;

const logDirPath = path.resolve(process.cwd(), "logs");
const logFilePath = path.join(logDirPath, "api.log");

if (!fs.existsSync(logDirPath)) {
  fs.mkdirSync(logDirPath, { recursive: true });
}

const logStream = fs.createWriteStream(logFilePath, { flags: "a" });

const writeLog = (level: LogLevel, message: string, meta: LogMeta = {}): void => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    service: "api",
    ...meta
  };

  const line = JSON.stringify(logEntry);

  console.log(line);
  logStream.write(`${line}\n`);
};

export const logger = {
  info: (message: string, meta: LogMeta = {}): void => {
    writeLog("info", message, meta);
  },

  warn: (message: string, meta: LogMeta = {}): void => {
    writeLog("warn", message, meta);
  },

  error: (message: string, meta: LogMeta = {}): void => {
    writeLog("error", message, meta);
  }
};
