const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000
const routes = require('./routes/routes.js')
const middleware = require('./middlewares/global_middlewares')


var corsOptions = function(req, res, next){ 
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 
    'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
}

app.use(corsOptions);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middleware(app)
routes(app)

app.listen(port, () => {
    console.log(`El servidor se encuentra escuchando en el puerto ${port}`)
} )