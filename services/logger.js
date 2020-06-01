const winston = require("winston");
const { createLogger, format } = require("winston");
const { combine, timestamp, printf } = format;

const customLogger = createLogger({
  format: combine(
    timestamp(),
    printf(({ level, message, timestamp }) => {
      return `${timestamp} ${level}: ${message}`;
    })
  ),
});

function transport(fileName) {
  return !fileName
    ? new winston.transports.Console()
    : new winston.transports.File({ filename: `${fileName}.log` });
}

if (process.env.NODE_ENV === "production") customLogger.remove(transport());

module.exports.logger = customLogger;
module.exports.transport = transport;
