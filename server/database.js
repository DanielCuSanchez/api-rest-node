const mongoose = require('mongoose');
const colors = require('colors/safe');
const config = require('./config');

const database = async ()=>{
    const DATABASE = config.URL_MONGO ;
    try {
        await mongoose.connect(DATABASE,{
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
