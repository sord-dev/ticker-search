const app = require('express')();

app.use('/api/ticker', require('./routes/ticker.routes.js'));
app.use('/api/earnings', require('./routes/earnings.routes.js'));

module.exports = app;