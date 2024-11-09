require('dotenv').config();
const {existsSync, mkdirSync} = require('fs');
const { join } = require('path');
const { format, transports } = require('winston');

const { logger } = require('./src/utils');

const app = require('./src/server');
const port = process.env.PORT || 3000;

// make sure the cache directory exists (to be replaced with a proper cache system)
const cacheDir = join(__dirname, 'src', 'cache');
if (!existsSync(cacheDir)) mkdirSync(cacheDir);

app.listen(port, () => { logger.info(`Server listening on http://localhost:${port}`); });

if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
        format: format.simple(),
    }));
}