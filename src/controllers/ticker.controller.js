const path = require('path');
const { loadCSVData } = require('../utils');

// Define the fixed path for the CSV file
const csvFilePath = path.join('combined_file.csv');

// Load the CSV data when the server starts
const csvData = loadCSVData(csvFilePath);

module.exports.getTickers = (req, res) => {
    if (csvData.length === 0) {
        return res.status(500).json({ error: 'CSV data not loaded yet' });
    }

    const { page, limit, startIndex, endIndex } = req.pagination;

    const results = csvData.slice(startIndex, endIndex);
    res.json({  page, limit, results });
}

module.exports.getTicker = (req, res) => {
    const ticker = req.params.ticker;
    const record = csvData.find(row => row.Symbol === ticker);

    if (!record) {
        return res.status(404).json({ error: `Company with ticker '${ticker}' not found` });
    }

    res.json(record);
}