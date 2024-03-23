const express = require('express')
const { dbConnection } = require('./database/config')
const cors = require('cors')
require('dotenv').config()

// creando server de express
const app = express()

// DataBase
dbConnection()

// Cors
app.use(cors())

// public folder
app.use(express.static('public'))

// parse body info
app.use(express.json())

// rutas
app.use('/api/auth', require('./routes/auth'))
// TODO Auth // Crear, Login, renew


// escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log('server corriendo en el puerto: ', process.env.PORT)
})