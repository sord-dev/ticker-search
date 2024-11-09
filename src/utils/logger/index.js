const { createLogger, transports, format } = require('winston');

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
    ),
    defaultMeta: { service: 'earnings-tracker' },
    transports: [new transports.File({ filename: 'error.log', level: 'error' }), new transports.File({ filename: 'combined.log' })]
});

module.exports = logger;