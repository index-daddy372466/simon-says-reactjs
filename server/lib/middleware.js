const path = require("path")
const url = require('url')
module.exports = function(app,cors,express,bodyParser){
    // app.use(express.static(path.join(__dirname, 'build')))
    app.use(express.static(path.resolve(__dirname,'../../build'))); //here is important thing - no static directory, because all static :)
    app.use(bodyParser.urlencoded({extended:false}))
    app.use(bodyParser.json())
    app.use(express.urlencoded({extended:true}))
    app.use(express.json())
    }