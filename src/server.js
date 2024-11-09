const app = require('express')();
app.use(require('body-parser').json());
app.use(require('cors')());

app.use('/api/tickers', require('./routes/ticker.routes.js'));
app.use('/api/ticker', (_, res) => { res.redirect(301, '/api/tickers') });

app.use('/api/earnings', require('./routes/earnings.routes.js'));
app.use('/api/earning', (_, res) => { res.redirect(301, '/api/earnings') });
app.use('/api/earn', (_, res) => { res.redirect(301, '/api/earnings') });

app.use('/api/auth', require('./routes/auth.routes.js'));

module.exports = app;