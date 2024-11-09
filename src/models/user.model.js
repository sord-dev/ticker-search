const { JWT } = require("../utils");
const users = [{ userId: 123, username: 'stefan', password: '123', watchList: ['AAPL', 'GOOGL', 'TSLA'] }];

class User {
    constructor({ username, password, watchList = [] }) {
        this.username = username;
        this.password = password;
        this.watchList = watchList;
    }


    comparePassword(password) {
        return this.password === password;
    }

    static findOne({ username }) {
        return new User(users.find(user => user.username === username));
    }

    static async create({ username, password }) {
        try {
            const user = new User({ username, password });
            users.push(user);
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async generateToken() {
        const signed = JWT.sign({ ...this });
        return { token: signed, user: this }
    }
}

module.exports = User;