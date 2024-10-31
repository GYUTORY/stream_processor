'use strict';

import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const { combine, timestamp, printf } = winston.format;

const customFormat = printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`);

class Logger {
    private options: winston.LoggerOptions;
    public logger: winston.Logger;

    constructor() {
        this.options = {
            format: combine(
                timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                customFormat
            ),
            transports: [
                new DailyRotateFile({
                    // level: ConstantConfig.LOG.LEVEL, // 주석 유지 또는 환경 변수로 전환 고려
                    datePattern: 'YYYYMMDD',
                    dirname: './logs',
                    filename: 'dbc_%DATE%.log',
                    maxSize: '10mb',
                    maxFiles: '10',
                    zippedArchive: true, // 압축 옵션 추가
                })
            ]
        };

        this.logger = winston.createLogger(this.options);
    }
}

const logger = new Logger();
export default logger.logger;
