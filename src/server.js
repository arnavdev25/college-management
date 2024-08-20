const express = require('express');
require('dotenv').config()
const studentRoute = require('./routes/studentRoute')
require('./helpers/postgres')

const app = express()
app.use(express.json())
app.use('/student', studentRoute)
const PORT = process.env.PORT;


app.listen(PORT, () => {
    console.log(`listening on server ${PORT}`);
})