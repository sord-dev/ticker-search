const router = require('express').Router();
const { getEarningsData } = require('../controllers/earnings.controller.js');

router.get('/:ticker', getEarningsData);

module.exports = router;