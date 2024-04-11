const { pool } = require('./db.js')

module.exports = async function(round){
    // get fixed data
    const insertColor = await pool.query("insert into gameboard(color) values(ARRAY[$1])",[round])
}

