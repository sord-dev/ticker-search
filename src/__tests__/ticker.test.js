const { ok, strictEqual } = require('node:assert');
const { describe, it } = require('node:test');
const { loadCSVData } = require('../utils');

describe('Ticker Controller', () => {
    const csvData = loadCSVData('combined_file.csv');

    it('Should load CSV data', () => {
        ok(csvData && csvData.length > 0);
    });

    it('Should return valid ticker data', () => {
        const ticker = 'AAPL';
        const record = csvData.find(row => row.Symbol === ticker);

        ok(record);
        strictEqual(record.Symbol, ticker);
    });
});