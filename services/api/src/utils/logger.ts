type LogLevel = "info" | "warn" | "error";

type LogMeta = Record<string, unknown>;

const writeLog = (level: LogLevel, message: string, meta: LogMeta = {}): void => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...meta
  };

  console.log(JSON.stringify(logEntry));
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
