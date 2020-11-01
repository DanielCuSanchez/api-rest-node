//Modo config
const modo = process.env.MODO || 'dev';
const config = {
    dev:{
        PORT: process.env.PORT || 4000,
    },
    production:{
        PORT: process.env.PORT || 4000,
    }
}
module.exports = config[modo];



