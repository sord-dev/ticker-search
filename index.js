require('dotenv').config();
const app = require('./src/server');
const port = process.env.PORT || 3000;
const fs = require('fs');
const path = require('path');

// make sure the cache directory exists (to be replaced with a proper cache system)
const cacheDir = path.join(__dirname, 'src', 'cache');
if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir);

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
