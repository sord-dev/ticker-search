const User = require('../models/user.model.js');

module.exports.createUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.create({ username, password });
        res.json(user);
    } catch (error) {
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
        res.json({ token });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}