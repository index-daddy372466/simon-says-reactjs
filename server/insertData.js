const { pool } = require('./db.js')

module.exports = async function(){
    // get fixed data
  let insertColors = await pool.query("insert into gameboard(color) values('red'),('blue'),('green');")
    console.log(insertColors)
}

