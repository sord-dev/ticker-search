const fs = require('fs');
const csv = require('csv-parser');

module.exports.loadCSVData = (csvFilePath) => {
    const results = [];
    
    fs.createReadStream(csvFilePath)
        .pipe(csv()) // Automatically parses the CSV into objects
        .on('data', (data) => results.push(data)) // Push each row into the results array
        .on('end', () => {
            console.log('CSV data loaded successfully');
        })
        .on('error', (err) => {
            console.error('Error reading the CSV file:', err.message);
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