const { response } = require('express')
const bcrypt = require('bcryptjs')

const User = require('../models/User-model')

const getUsers = async (req, res = response) => {
  const users = await User.find()
    res.json({
      status: 'active',
      msg: 'Users list',
      users
    })
}

module.exports = {
  getUsers
}
