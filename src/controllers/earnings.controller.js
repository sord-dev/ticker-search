const axios = require('axios');

const getEarnings = async (ticker) => {
    const response = await axios.get(`https://api.api-ninjas.com/v1/earningscalendar?ticker=${ticker}`);
    if(response.status === 404 || !response.data.length) throw new Error('Error: Failed to find earnings data');
    return response.data;
}

const getEarningsData = async (req, res) => {
    const { ticker } = req.params;

    try {
        const earningsData = await getEarnings(ticker);
        res.json(earningsData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getEarnings, getEarningsData };