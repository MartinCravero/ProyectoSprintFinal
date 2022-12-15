const express = require('express');
const router = express.Router()

const {selecUbicacion} = require('../controllers/ubicacion/selecUbicacion')
const {selecTodasSubregiones} = require('../controllers/ubicacion/selecTodasSubregiones')
const {editarUbicaciones} = require('../controllers/ubicacion/editarUbicaciones')
const {nuevosPaises} = require('../controllers/ubicacion/nuevosPaises')
const {elimPaises} = require('../controllers/ubicacion/elimPaises')
const {nuevasProvincias} = require('../controllers/ubicacion/nuevasProvincias')
const {elimProvincias} = require('../controllers/ubicacion/elimProvincias')
const {selecListaCiudades} = require('../controllers/ubicacion/selecListaCiudades')
const {nuevasCiudades} = require('../controllers/ubicacion/nuevasCiudades')
const {elimCiudades} = require('../controllers/ubicacion/elimCiudades')

const middleware = require('../middlewares/middle_location')


router.get('/', selecUbicacion)
router.get('/subregiones', selecTodasSubregiones)
router.put('/', editarUbicaciones)
router.post('/pais', nuevosPaises)
router.delete('/pais', elimPaises)
router.post('/provincia', nuevasProvincias)
router.delete('/provincia', elimProvincias)
router.get('/ciudad', selecListaCiudades)
router.post('/ciudad', middleware.findDuplicate, nuevasCiudades)
router.delete('/ciudad', elimCiudades)

module.exports = router