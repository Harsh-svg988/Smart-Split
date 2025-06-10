import winston from 'winston';

const logger = winston.createLogger({
  level: 'info', // Use 'debug' for more verbosity
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message, stack }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${stack || message}`;
    })
  ),
  transports: [
    new winston.transports.Console(), // Log to console
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }), // Error logs
    new winston.transports.File({ filename: 'logs/combined.log' }) // All logs
  ],
});

// Stream for morgan HTTP logger
interface LoggerStream {
  write: (message: string) => void;
}

logger.stream = {
  write: (message: string) => logger.info(message.trim())
} as LoggerStream;

export default logger;
