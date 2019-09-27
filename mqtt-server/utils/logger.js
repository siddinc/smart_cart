'use strict';

const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf, colorize } = format;

const customFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} - ${level}: [${message}]`;
});

const logger = createLogger({
  level: 'silly',
  format: combine(
    label({ label: process.mainModule.filename }),
    timestamp({ format: 'DD-MM-YYYY | HH:mm:ss' }),
    customFormat,
    colorize({ all: true })
  ),
  transports: [new transports.Console()],
});

exports.logger = logger;
