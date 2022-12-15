const {dbSelecSubreg, dbSelecPais, dbSelecProvincia, dbSelecCiudad, dbSelecCiudadesDePais, dbSelecDireccionesDeCiudad} = require('../../models/dbUbicaciones');
const Response = require('../../utilities/response')

const selecUbicacion = async function (req, res) {
    const {region, pais, provincia, id_pais, ciudad} = req.query
    console.log
    try{
        if (region) {
            let dbRes = await dbSelecSubreg([region])
            res.status(200).send(dbRes)
        } if (!pais && !provincia && !region && !id_pais && !ciudad) {
            let dbRes = await dbSelecPais()
            res.status(200).send(dbRes)
        } if (pais && !provincia && !region) {
            let dbRes = await dbSelecProvincia([pais])
            res.status(200).send(dbRes)
        } if (provincia && !region) {
            let dbRes = await dbSelecCiudad([pais, provincia])
            res.status(200).send(dbRes)
        } if (id_pais) {
            let dbRes = await dbSelecCiudadesDePais([id_pais])
            response = new Response(false,200,'El Listado de las ciudades del país es el siguiente', dbRes)
            res.status(200).send(response)
        } if (ciudad) {
            let dbRes = await dbSelecDireccionesDeCiudad([ciudad])
            response = new Response(false,200,'El Listado de las direcciones de la ciudad es el siguiente', dbRes)
            res.status(200).send(response)
        }
    } catch(e) {
        response = new Response(false,500,'Error al obtener las ubicaciones')
        res.status(500).send(response)
    }

}

module.exports = {selecUbicacion}