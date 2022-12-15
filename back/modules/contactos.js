const express = require('express');
const router = express.Router()


const {selecContactos} = require('../controllers/contactos/selecContactos')
const {nuevosContactos} = require('../controllers/contactos/nuevosContactos')
const {editarContactos} = require('../controllers/contactos/editarContactos')
const {elimContactos} = require('../controllers/contactos/elimContactos')
const {elimVariosContactos} = require('../controllers/contactos/elimVariosContactos')
const middleware = require('../middlewares/middle_contacts')

router.get('/', selecContactos)
router.post('/', middleware.validateAddFields, middleware.validateEmailRegex, middleware.findDuplicate, middleware.validateChannelFields, nuevosContactos)
router.put('/', middleware.validateEditFields, middleware.findDifferences, middleware.validateEmailRegex, middleware.validateChannelEditFields, editarContactos)
router.delete('/', elimContactos)
router.delete('/massive', elimVariosContactos)


module.exports = router