const { ok, strictEqual } = require('node:assert');
const { describe, it } = require('node:test');
const { getEarnings } = require('../controllers/earnings.controller');

describe('Earnings Controller', () => {
    it('Should return valid earnings data', async () => {
        const earnings = await getEarnings('AAPL');
        ok(earnings && earnings.length > 0);
        strictEqual(earnings[0].ticker, 'AAPL');
    });
});