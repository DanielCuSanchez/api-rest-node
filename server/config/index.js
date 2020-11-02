//Modo config
const modo = process.env.MODO || 'DEV';
const config = {
    DEV:{
        PORT: process.env.PORT || 3000,
        URL_MONGO: 'mongodb://localhost:27017/cafe'
    },
    PRODUCTION:{
        PORT: process.env.PORT || 3000,
        URL_MONGO: process.env.URL_MONGO
    }
}
module.exports = config[modo];



