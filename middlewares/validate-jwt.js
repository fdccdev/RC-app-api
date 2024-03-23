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
    jwt.verify(token, process.env.SECRET_JWT_SEED)
    next()
  } catch (error) {
    res.status(401).json({
      status: 'error',
      msg: 'El token no es válido',
    })
  }
}

module.exports = {
  validateJWT,
}
