const bodyParser = require('body-parser');
const express = require("express");
const { database } = require('./database');

//Database
database();
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());

app.use(require('./routes/usuarios'));


module.exports = { app };