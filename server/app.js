require('dotenv').config();
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const routes = require("./lib/routes.js")
const middleware = require('./lib/middleware.js');
const pool = require('./db.js').pool
const PORT = !process.env.PORT ? 5535 : process.env.PORT

const app = express();

middleware(app,cors,express,bodyParser)
routes(app,pool)

app.listen(PORT,()=>{
    console.log('you are listening on port '+ PORT + "!")
})