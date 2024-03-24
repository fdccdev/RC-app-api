const { response } = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/User-model')
const {generateJwt} = require('../helpers/jwt')

const createUser = async (req, res = response) => {
  const { email_corp, password } = req.body

  try {
    let userExist = await User.findOne({ email_corp })

    if (userExist) {
      return res.status(400).json({
        status: 'error',
        msg: 'El usuario ya existe en la plataforma!',
      })
    }
      const user = new User(req.body)
      // Encriptar password
      const salt = bcrypt.genSaltSync()
      user.password = bcrypt.hashSync( password, salt)

      await user.save()

      // Generar jwt
      const token = await generateJwt(user.uid, user.name)

      res.status(201).json({
        state: 'active',
        msg: 'Usuario registrado correctamente!',
        uid: user.id,
        name: user.name,
        token
      })
    
  } catch (error) {
    console.log(error)
    res.status(500).json({
      state: 'error',
      msg: 'Comuniquese con el administrador!',
    })
  }
}

const login = async (req, res = response) => {

  const {email_corp, password} = req.body

  try {
    let userExist = await User.findOne({ email_corp })
    if(!userExist){
      return res.status(400).json({
        state: 'error',
        msg: 'El usuario o la contraseña no existe!'
      })
    }
    // Confirmar contraseña
    const validPass = bcrypt.compareSync(password, userExist.password)
    if(!validPass){
      return res.status(400).json({
        state: 'error',
        msg: 'Contraseña incorrecta!'
      })
    }

    // Generar JWT
    const token = await generateJwt(userExist.id, userExist.name, userExist.active)

    res.status(200).json({
      uid: userExist.id,
      name: userExist.name,
      token
    })
    
  } catch (error) {
    console.log(error)
    res.status(500).json({
      state: 'error',
      msg: 'Comuniquese con el administrador!',
    })
  }
}

module.exports = {
  createUser,
  login,
}
