require('dotenv').config()

const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())

const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true})

const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log("Connected to Mongo"))

app.use(express.json())

require("./routes")(app)

app.listen(4200, () => {
    console.log("server running")
})