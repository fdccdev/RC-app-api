const { response, request } = require('express')
const jwt = require('jsonwebtoken')

const validateJWT = (req = request, res = response, next) => {
  const token = req.header('rc-token')
  if (!token) {
    return res.status(401).json({
      status: 'error',
      msg: 'El token no se encuentra en la petición!',
    })
  }

  try {
    const { active } = jwt.verify(token, process.env.SECRET_JWT_SEED)

    if (!active) {
      return res.status(401).json({
        status: 'forbidden',
        msg: 'El usuario no se encuentra activo'
      })
    } 
    next()
  } catch (error) {
    console.log(error)
    res.status(401).json({
      status: 'error',
      msg: 'El token no es válido',
    })
  }
}

module.exports = {
  validateJWT,
}
