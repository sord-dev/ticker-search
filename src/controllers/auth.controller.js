const User = require('../models/user.model.js');
const { logger } = require('../utils/index.js');

module.exports.createUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.create({ username, password });
        logger.info(`User ${username} created successfully`);
        res.json(user);
    } catch (error) {
        logger.error(`Error creating user: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
}

module.exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) throw new Error('Error: User not found');

        const isMatch = await user.comparePassword(password);
        if (!isMatch) throw new Error('Error: Invalid password');

        const token = await user.generateToken();
        logger.info(`User ${username} logged in successfully`);
        res.json({ token });
    }
    catch (error) {
        logger.error(`Error logging in user: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
}