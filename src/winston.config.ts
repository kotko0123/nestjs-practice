import {WinstonModule} from 'nest-winston';
import * as winston from 'winston';
import {getTraceId} from "./trace-id.middleware";


// error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
export const winstonLogger = WinstonModule.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.errors({ stack: true }), // <-- use errors format
    winston.format.timestamp(), // 로그 남긴 시각 표시
    winston.format.colorize(),
    winston.format.printf(({timestamp, level, message, context}) => {
      const traceId = getTraceId() || 'no-trace-id';
      return `${timestamp} [${level}] [${traceId}] [${context}] ${message}`;
    }),
  ),
  transports: [
    new winston.transports.Console(),
  ],
});