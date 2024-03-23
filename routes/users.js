const {Router} = require('express')

const router = Router()

const {getUsers} = require('../controllers/user')
const { validateJWT } = require('../middlewares/validate-jwt')

router.get('/', validateJWT, getUsers)

module.exports = router