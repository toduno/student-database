const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv')
const port = process.env.PORT || 7000

const cors = require('cors')
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
}
//const bodyParser = require('body-parser')
//const urlencodedParser = bodyParser.urlencoded({ extended: false})

app.use(cors(corsOptions))
//app.use(bodyParser.json(), urlencodedParser)
app.use(express.json())
app.use(require('./routes/record.js'))
app.use(require('./routes/auth.js'))
app.use('/uploads', express.static('uploads'))
// app.use('/middleware/verifyjwt', express.static('verifyjwt'))

app.listen(port, () => {
    //perform a database connection when server starts
    const url = 'mongodb://localhost/StudentRecord'
    mongoose.connect(url, {useNewUrlParser: true})
    const con = mongoose.connection

    con.on('open', () => {
        console.log('Database connected...')
    })

    console.log(`Server is running on port: ${port}`)
})