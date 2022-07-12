const express = require('express')
const app = express()
const PORT = 5500
const ConnectDB = require('./db')



// app.use(express.json())
// app.use('/api/auth', require('./Auth/route'))

ConnectDB()

app.use(express.json())

app.use('/api/Auth', require('./Auth/Route'))

const server = app.listen(PORT, () => {
    console.log(`connected to port ${PORT}`)
})

process.on('unhandledRejection', err => {
    console.log(`an error occured : ${err.message}`)
    server.close(() => process.exit(1))
})