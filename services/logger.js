const config = require("config");
const winston = require("winston");
require("winston-mongodb");
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

function dbTransport(collection, level) {
  const options = {
    db: config.get("db"),
    collection,
    level,
    options: { useUnifiedTopology: true },
  };

  return new winston.transports.MongoDB(options);
}

if (process.env.NODE_ENV !== "development") {
  customLogger.remove(transport()).add(dbTransport("info", "info"));
}

module.exports.logger = customLogger;
module.exports.transport = transport;
module.exports.dbTransport = dbTransport;
