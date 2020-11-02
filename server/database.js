const mongoose = require('mongoose');
const colors = require('colors/safe');
const config = require('./config');

const database = async ()=>{
    try {
        await mongoose.connect(config.URL_MONGO,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log(colors.green('Database connected'));
    } catch (error) {
        console.log(error)
    }

}
module.exports = { database };
