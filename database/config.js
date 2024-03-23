const mongoose = require('mongoose')

const dbConnection = async() => {
    try {

        mongoose.connect(process.env.DB_CNN, {})

        console.log('DB Connection On!')
        
    } catch (error) {
        console.log(error)
        throw new Error('Error iniciando la BD')
    }
}

module.exports = {
    dbConnection
}