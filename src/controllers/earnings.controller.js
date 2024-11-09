const axios = require('axios');

module.exports.getEarnings = async (ticker) => {
    const response = await axios.get(`https://api.api-ninjas.com/v1/earningscalendar?ticker=${ticker}`);
    return response.data;
}

module.exports.getEarningsData = async (req, res) => {
    const { ticker } = req.params;

    try {
        const earningsData = await getEarnings(ticker);
        res.json(earningsData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};