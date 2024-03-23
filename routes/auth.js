/* 
    Rutas de usuarios / Auth
    host + /api/auth

*/

const {Router} = require('express')
const {check} = require('express-validator')
const router = Router()

const {createUser, login} = require('../controllers/auth')
const { validate } = require('../middlewares/fieldValidate')

router.post(
    '/create', 
    [ // middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email_corp', 'Debe escribir un email válido').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('password', 'El password debe ser de 6 caracteres').isLength({min: 6}),
        validate
    ] ,
    createUser)

router.post(
    '/',
    [
        check('email_corp', 'Debe escribir un email válido').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('password', 'El password debe ser de 6 caracteres').isLength({min: 6}),
        validate
    ],
    login)

module.exports = router