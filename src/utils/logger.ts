import { createLogger, format, transports } from 'winston';
import { ApplicationConstants } from '../constants/ApplicationConstants';
import options from '../configs/LoggerConfig.json';

const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}] ${message}`;
});

export const logger = createLogger({
  level: ApplicationConstants.LOG_LEVEL_INFO,
  format: combine(
    format.colorize(),
    timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
    myFormat
  ),
  transports: [
    new transports.File(options.file),
    new transports.Console(options.console),
  ],
});
