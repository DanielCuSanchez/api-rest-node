const config = require('./server/config');
const { app } = require('./server');
require('dotenv').config();


app.listen(config.PORT, () => console.log(`http://localhost:${config.PORT}`));
