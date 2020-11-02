//Modo config
const MODO = process.env.MODO || 'DEV';
const config = {
    DEV:{
        PORT: process.env.PORT || 3000,
        URL_MONGO: 'mongodb://localhost:27017/cafe'
    },
    PRODUCTION:{
        PORT: process.env.PORT,
        URL_MONGO: process.env.MONGO_DB
    }
}
module.exports = config[MODO];



