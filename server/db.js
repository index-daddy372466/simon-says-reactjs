require('dotenv').config();
const { Pool } = require('pg');
const Sequelize = require('sequelize').Sequelize

if(process.env.TYPE=='production'){
    const sequelize = new Sequelize(process.env.URI,{
        dialect:'postgres',
        logging:'false'
    })
    sequelize.sync().then(()=>{
                console.log('you are connected to pg')
            }).catch(err=>console.log(err))
}
        
    const pool = new Pool({
        user: process.env.DBU,
        database: process.env.DB,
        password: process.env.PD,
        port: process.env.DBP,
        host:process.env.DBH,
        ssl:{
            rejectUnauthorized: false,
        }
    })

// const getRows = async (pool) => {
//     const rows = await pool.query('select * from gameboard')
//     console.log(rows.rows);
// }
// getRows(pool)
module.exports = { pool };




