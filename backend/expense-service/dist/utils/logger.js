"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const logger = winston_1.default.createLogger({
    level: 'info', // Use 'debug' for more verbosity
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.printf(({ timestamp, level, message, stack }) => {
        return `${timestamp} [${level.toUpperCase()}]: ${stack || message}`;
    })),
    transports: [
        new winston_1.default.transports.Console(), // Log to console
        new winston_1.default.transports.File({ filename: 'logs/error.log', level: 'error' }), // Error logs
        new winston_1.default.transports.File({ filename: 'logs/combined.log' }) // All logs
    ],
});
// Add stream property to logger
logger.stream = {
    write: (message) => logger.info(message.trim())
};
exports.default = logger;
