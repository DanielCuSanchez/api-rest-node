require('dotenv').config();
const { app } = require('./server');
const config = require('./server/config');

app.listen(config.PORT, () => console.log(`http://localhost:${config.PORT}`));
