const fs = require('fs');
const csv = require('csv-parser');
const jwt = require('jsonwebtoken');

const logger = require('./logger');

module.exports.loadCSVData = (csvFilePath) => {
    const results = [];

    fs.createReadStream(csvFilePath)
        .pipe(csv()) // Automatically parses the CSV into objects
        .on('data', (data) => results.push(data)) // Push each row into the results array
        .on('end', () => {
            logger.info(`CSV file successfully processed. Total records: ${results.length}`);
        })
        .on('error', (err) => {
            logger.error(`Error while processing CSV file: ${err.message}`);
        });

    return results;
}

module.exports.paginationMiddleware = (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    req.pagination = {
        page,
        limit,
        startIndex,
        endIndex
    };

    next();
}

module.exports.FromNow = {
    month: Date.now() + 1000 * 60 * 60 * 24 * 30,
    week: Date.now() + 1000 * 60 * 60 * 24 * 7,
    day: Date.now() + 1000 * 60 * 60 * 24,
    hour: Date.now() + 1000 * 60 * 60,
    minute: Date.now() + 1000 * 60,
    second: Date.now() + 1000
}

module.exports.JWT = {
    sign: (payload, options) => jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h', ...options }),
    verify: (token, options) => jwt.verify(token, process.env.JWT_SECRET, { ...options }),
    decode: (token, decodeOptions) => jwt.decode(token, { ...decodeOptions })
}

module.exports.logger = logger;
