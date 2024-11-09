const router = require('express').Router();
const { getTickers, getTicker } = require('../controllers/ticker.controller');
const { paginationMiddleware } = require('../utils');

// API Route to fetch all parsed CSV data
router.get('/', paginationMiddleware, getTickers);

// API Route to fetch a specific record by ticker (searching by 'Symbol')
router.get('/:ticker', getTicker);

module.exports = router;