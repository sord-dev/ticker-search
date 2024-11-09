const app = require('express')();

app.use('/api/ticker', require('./routes/ticker.routes'));

module.exports = app;