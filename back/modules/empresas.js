const express = require('express');
const router = express.Router()

const {selecEmpresas} = require('../controllers/empresas/selecEmpresas')
const {nuevasEmpresas} = require('../controllers/empresas/nuevasEmpresas')
const {editarEmpresas} = require('../controllers/empresas/editarEmpresas')
const {elimEmpresas} = require('../controllers/empresas/elimEmpresas')
const middleware = require('../middlewares/middle_companies')


router.get('/', selecEmpresas)
router.post('/', middleware.validateCompFields, nuevasEmpresas)
router.put('/', middleware.validateCompFields, editarEmpresas)
router.delete('/', elimEmpresas)


module.exports = router