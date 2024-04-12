
// const insertData = require('../insertData.js') 
const clearData = require('../clearData.js')
const insertData = require('../insertData.js') 
const path = require('path')

module.exports = function(app,pool){


app.route("/").get((req,res)=>{
        console.log("page loads")
        res.json({test:true})
    })
// get all 
    app.route("/clear-data").get(async(req,res)=>{
        const data = await pool.query("select * from gameboard")
        console.log('clearing data')
        // res.json({data:arr})
        clearData();
        res.redirect("/")
    })
    // get the color
    app.route('/tracker').post((req,res)=>{
        const { tracker } = req.body
        console.log(tracker)
        // res.redirect('/')
    })
    app.route('/round').post(async(req,res)=>{
        const { round } = req.body;
        console.log(round)
        // test: insert color into array of colors
        insertData(round)
    })
    app.route('/fin-round').post(async(req,res)=>{
        const { round } = req.body;
        insertData(round)
        const getNumOfRounds = await pool.query("select count(round) from gameboard;")
        let count = getNumOfRounds.rows[0].count
        console.log(round)
        console.log(count)
        res.redirect("/")
    })
    // insert & clear data in gameboard table
    // app.route("/insert-data").get(async(req,res)=>{
    //     insertData();
    //     res.send("data-inserted")
    // })
    app.route("/delete-all").get(async(req,res)=>{
        clearData();
        res.redirect("/")
    })

    // React build folder (static files) are placed last in the routes-order.
    // This prevents request issues from occurring.
    // Since build is all static, do not forget to run "npm run build" ("react-scripts build") before running node server
    app.get("/*", async function (req, res) {
        res.sendFile(path.resolve(__dirname, '../../build','index.html'));
    })

}