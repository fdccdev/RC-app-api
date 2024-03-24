const {Router} = require('express')

const router = Router()

const {getUsers} = require('../controllers/user')
const { validateJWT } = require('../middlewares/validate-jwt')
const { validateRole } = require('../middlewares/validate-role')

router.get('/', [validateJWT, validateRole], getUsers)

module.exports = router