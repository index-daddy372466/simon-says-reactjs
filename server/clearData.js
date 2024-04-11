const { pool } = require('./db.js')

module.exports = async function(){
    
  let deleted = await pool.query("truncate gameboard;alter sequence gameboard_round_seq restart with 1;")
    console.log(deleted)
}


