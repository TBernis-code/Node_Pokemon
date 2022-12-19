const { createLogger, transports, format } = require("winston");

const logger = createLogger({
    level: 'info',
    format: format.json(),
    transports: [
      //
      // - Write to all logs with level `info` and below to `quick-start-combined.log`.
      // - Write all logs error (and below) to `quick-start-error.log`.
      //
      new transports.File({ filename: 'log.log' })
    ]
  });

module.exports = logger;