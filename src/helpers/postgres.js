const { Pool } = require('pg')
require('dotenv').config()


const pg_connection = new Pool({
    user: process.env.POSTGRES_USERNAME,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT
})


// pg_connection.connect().


module.exports = pg_connection;