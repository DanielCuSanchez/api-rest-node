const bodyParser = require('body-parser');
const express = require("express");
const config = require('./config');

const app = express();

const router = express.Router();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());

app.use(router);

router.get('/', (req, res) =>{
    res.send('Servidor corriendo....');
})

router.get("/usuarios", (req, res) => {
    const url = req.url;
    const response = {
        url,
        msg: 'GET'
    }
	res.json(response);
});

router.post("/usuarios", (req, res) => {
    const data = {
        usuario: req.body,
        msg: 'POST'
    }
	res.json(data);
});

router.put("/usuarios/:id", (req, res) => {
    const { id } = req.params;
    const response = {
        id,
        msg: 'PUT'
    }
	res.json(response);
});

router.delete("/usuarios/:id", (req, res) => {
    const id = req.params.id;
    const response = {
        id,
        msg: 'DELETE'
    }
	res.json(response);
});



app.listen(config.PORT, () => console.log(`http://localhost:${config.PORT}`));
