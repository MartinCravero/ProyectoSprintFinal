const express = require('express');
const router = express.Router()


const {selecUsuarios} = require('../controllers/usuarios/selecUsuarios')
const {nuevosUsuarios} = require('../controllers/usuarios/nuevosUsuarios')
const {login} = require('../controllers/usuarios/login')
const {editarUsuarios} = require('../controllers/usuarios/editarUsuarios')
const {elimUsuarios} = require('../controllers/usuarios/elimUsuarios')
const middleware = require('../middlewares/middle_users')
const {validatePrivilege} = require('../middlewares/validatePrivilege')

router.post('/login', login)
router.post('/signup', middleware.validateFields, middleware.findDuplicate, middleware.validateEmailRegex, nuevosUsuarios)
router.get('/', selecUsuarios)
router.put('/', validatePrivilege, middleware.validateEditFields, middleware.findDifferences, middleware.validateEmailRegex, editarUsuarios)
router.delete('/', validatePrivilege, elimUsuarios)


module.exports = router