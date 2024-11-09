const axios = require('axios');
const path = require('path');
const fs = require('fs');
const { FromNow, logger } = require('../utils');

// check if cache exists, if not create it (to be replaced with a proper cache system)
const cache = path.join(__dirname, '..', 'cache', 'earnings.json');
if (!fs.existsSync(cache)) fs.writeFileSync(cache, '{}');

const getEarnings = async (ticker) => {
    const cachedResponse = JSON.parse(await fs.promises.readFile(cache)); 
    if (cachedResponse.hasOwnProperty(ticker) && cachedResponse[ticker].ttl > Date.now()) {
        logger.info(`Fetched earnings data for ${ticker} from cache`);
        const cachedEarnings = cachedResponse[ticker];
        return cachedEarnings.data;
    }
    else {
        const response = await axios.get(`https://api.api-ninjas.com/v1/earningscalendar?ticker=${ticker}`);
        logger.info(`Fetched earnings data for ${ticker} from api.api-ninjas.com`);
        if (response.status === 404 || !response.data.length) throw new Error('Error: Failed to find earnings data');

        const cachedResponse = JSON.parse(await fs.promises.readFile(cache));
        const newItem = { data: response.data, ttl: FromNow.week };
        const newCache = Object.assign({}, cachedResponse, {[ticker]: newItem});

        await fs.promises.writeFile(cache, JSON.stringify(newCache, null, 2));
        return response.data;
    }
};

const getEarningsData = async (req, res) => {
    const { ticker } = req.params;

    try {
        const earningsData = await getEarnings(ticker);
        logger.info(`Earnings data for ${ticker} fetched successfully`);
        res.json(earningsData);
    } catch (error) {
        logger.error(`Error fetching earnings data for ${ticker}: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getEarnings, getEarningsData };