const { response, request } = require('express')
const jwt = require('jsonwebtoken')

const User = require('../models/User-model')

const validateRole = async (req = request, res = response, next) => {
    const token = req.header('rc-token')
    try {
        const { uid } = jwt.verify(token, process.env.SECRET_JWT_SEED)
        const user = await User.findById(uid)
        console.log(user.role)
        if(user.role !== 'admin'){
            return res.status(401).json({
                status: 'forbidden',
                msg: 'El usuario no tiene privilegios para esta consulta.'
            })
        }
        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({
            status: 'error',
            msg: 'Algo salió mal! comuniquese con el administrador.',
          })
    }
}

module.exports = {
    validateRole
}